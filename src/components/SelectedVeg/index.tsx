import { NotePencil, Trash } from 'phosphor-react'
import { useContext, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SelectedVegContext } from '../../contexts/SelectedVegContext'
import { api } from '../../services/api'
import { Cell } from '../Cell'
import { SubmitFormButton } from '../SubmitFormButton/styles'
import {
  ChangeCardInput,
  ChangeInfoButton,
  EditVegContainer,
  EditVegForm,
  NoVegSelectedContainer,
  VegInfoContainer,
} from './styles'
import { CheckboxInput } from './CheckboxInput'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { AuthContext } from '../../contexts/AuthContext'
import { ReactComponent as NoVegImg } from '../../assets/images/no-veg-selected.svg'

const DAYS = ['mon', 'tue', 'wed', 'thu', 'fri'] as const

interface EditVegFormData {
  fri_dinner: boolean
  fri_lunch: boolean
  mon_dinner: boolean
  mon_lunch: boolean
  thu_dinner: boolean
  thu_lunch: boolean
  tue_dinner: boolean
  tue_lunch: boolean
  wed_dinner: boolean
  wed_lunch: boolean
  is_permanent: boolean
}

interface EditVegCardFormData {
  new_card: number
}

interface UnusualReservation {
  card: number
  day: string
  meal: 'lunch' | 'dinner'
  will_come: boolean
}

function calculateRatio(absences: number, total: number) {
  if (total === 0) return 0
  return (absences / total) * 100
}

export function SelectedVeg() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<EditVegFormData>()

  const { selectedVeg } = useContext(SelectedVegContext)
  const { signOut } = useContext(AuthContext)

  const [lastChangeWasPermanent, setLastChangeWasPermanent] = useState(false)
  const { changeSelectedVeg } = useContext(SelectedVegContext)

  const {
    register: registerCard,
    handleSubmit: handleSubmitCard,
    reset: resetCard,
    formState: { isSubmitting: isSubmittingCard },
  } = useForm<EditVegCardFormData>({
    defaultValues: { new_card: selectedVeg?.card },
  })

  useEffect(() => {
    const defaultValues = {} as any
    for (const day of DAYS) {
      for (const meal of ['lunch', 'dinner'] as const) {
        defaultValues[`${day}_${meal}`] = selectedVeg
          ? selectedVeg.scheduleTable[day][meal]
          : false
      }
    }
    reset({ ...defaultValues })
    resetCard({ new_card: selectedVeg?.card })
  }, [selectedVeg, reset, resetCard])

  if (!selectedVeg) {
    return (
      <NoVegSelectedContainer>
        <NoVegImg />
        <h2>Nenhum usuário selecionado...</h2>
      </NoVegSelectedContainer>
    )
  }

  const handleCreateVeg: SubmitHandler<EditVegFormData> = async (values) => {
    const body = {
      card: selectedVeg.card,
      unusualReservations: [] as UnusualReservation[],
      is_permanent: values.is_permanent,
    }

    for (const day of DAYS) {
      for (const meal of ['lunch', 'dinner'] as const) {
        if (
          values[`${day}_${meal}`] !== selectedVeg.scheduleTable[day][meal] ||
          values.is_permanent !== lastChangeWasPermanent
        ) {
          body.unusualReservations.push({
            card: selectedVeg.card,
            day,
            meal,
            will_come: values[`${day}_${meal}`],
          })
        }
      }
    }

    if (!body.unusualReservations.length) return

    try {
      const response = await api.post('/vegs/unusual', body)
      console.log(response.status)

      if (response.status === 201) {
        toast.success('🥦 Usuário Atualizado! 🥦')
        const newScheduleTable = structuredClone(selectedVeg.scheduleTable)

        for (const day of DAYS) {
          for (const meal of ['lunch', 'dinner'] as const) {
            newScheduleTable[day][meal] = values[`${day}_${meal}`]
          }
        }
        changeSelectedVeg({
          ...selectedVeg,
          scheduleTable: newScheduleTable,
        })

        setLastChangeWasPermanent(values.is_permanent)
      } else {
        toast.error(`[${response.status}] - ${response.data.message}`)
      }

      resetCard({ new_card: 0 })
    } catch (e) {
      if (!(e instanceof AxiosError) || !e.response) {
        toast.error('Ocorreu um erro não identificado')
        return
      }

      const { response } = e
      toast.error(`[${response.status}] - ${response.data.message}`)

      if (response.status === 401) signOut()
    }
  }

  const handleUpdateCard: SubmitHandler<EditVegCardFormData> = async (
    values,
  ) => {
    const body = {
      old_card: selectedVeg.card,
      new_card: values.new_card,
    }

    try {
      const response = await api.patch('/vegs/card', body)
      console.log(response.status)

      if (response.status === 200) {
        toast.success('🥦 Usuário Atualizado! 🥦')
        changeSelectedVeg({
          ...selectedVeg,
          card: values.new_card,
        })
      }
    } catch (e) {
      if (!(e instanceof AxiosError) || !e.response) {
        toast.error('Ocorreu um erro não identificado')
        return
      }

      const { response } = e
      toast.error(`[${response.status}] - ${response.data.message}`)

      if (response.status === 401) signOut()
    }
  }

  async function handleDecrementAbscence() {
    // req.params.id
    if (!selectedVeg || selectedVeg.absences < 1) return
    await api.put(`/vegs/decrementabsences/${selectedVeg!.card}`)
    changeSelectedVeg({ ...selectedVeg, absences: selectedVeg.absences - 1 })
  }

  return (
    <EditVegContainer>
      <EditVegForm onSubmit={handleSubmit(handleCreateVeg)}>
        <h2>Agenda</h2>
        <table>
          <thead>
            <th>Seg</th>
            <th>Ter</th>
            <th>Qua</th>
            <th>Qui</th>
            <th>Sex</th>
          </thead>
          <tbody>
            <tr>
              {DAYS.map((day) => {
                const code = `${day}_lunch` as keyof EditVegFormData
                return <Cell key={code} fromContext {...register(code)} />
              })}
            </tr>
            <tr>
              {DAYS.map((day) => {
                const code = `${day}_dinner` as keyof EditVegFormData
                return <Cell key={code} fromContext {...register(code)} />
              })}
            </tr>
          </tbody>
        </table>

        <CheckboxInput label="É permanente?" {...register('is_permanent')} />

        <SubmitFormButton disabled={isSubmitting}>
          <NotePencil size={24} />
          Salvar
        </SubmitFormButton>
      </EditVegForm>

      <VegInfoContainer>
        <div>
          <h3>Info</h3>
          <Trash size={16} />
        </div>
        <h2>{selectedVeg.name}</h2>
        <div>
          <p>Cartão ⇒</p>
          <form onSubmit={handleSubmitCard(handleUpdateCard)}>
            <ChangeCardInput
              type="number"
              {...registerCard('new_card', {
                max: 99999999,
                min: 10000000,
              })}
            />
            <ChangeInfoButton type="submit" disabled={isSubmittingCard}>
              Mudar
            </ChangeInfoButton>
          </form>
        </div>
        <div>
          <p>Faltas ⇒ {selectedVeg.absences}</p>
          <ChangeInfoButton type="button" onClick={handleDecrementAbscence}>
            Decrementar
          </ChangeInfoButton>
        </div>
        <p>Presenças ⇒ {selectedVeg.attendances}</p>
        <p>
          Porcentagem de faltas ⇒{' '}
          {calculateRatio(selectedVeg.absences, selectedVeg.attendances)}%
        </p>
      </VegInfoContainer>
    </EditVegContainer>
  )
}