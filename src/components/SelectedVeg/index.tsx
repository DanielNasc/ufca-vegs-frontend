import { ArrowLeft, NotePencil, Trash } from 'phosphor-react'
import { useContext, useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { SelectedVegContext } from '../../contexts/SelectedVegContext'
import { Cell } from '../Cell'
import { SubmitFormButton } from '../SubmitFormButton/styles'
import {
  ChangeCardInput,
  ChangeInfoButton,
  DeleteVegButton,
  EditVegContainer,
  EditVegForm,
  // NoVegSelectedContainer,
  UnselectVeg,
  VegInfoContainer,
} from './styles'
import { CheckboxInput } from './CheckboxInput'
import { toast } from 'react-toastify'
// import { AuthContext } from '../../contexts/AuthContext'
// import { ReactComponent as NoVegImg } from '../../assets/images/no-veg-selected.svg'
import { SearchVegs } from '../SearchVeg'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../services/firebase'

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
  new_card: string
}

// interface UnusualReservation {
//   card: string
//   day: string
//   meal: 'lunch' | 'dinner'
//   will_come: boolean
// }

type ScheduleTable = {
  [key: string]: {
    [meal: string]: {
      is_permanent: boolean
      will_come: boolean
    }
  }
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
  // const { signOut } = useContext(AuthContext)

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
        if (selectedVeg?.scheduleTable[day][meal]) {
          defaultValues[`${day}_${meal}`] =
            selectedVeg?.scheduleTable[day][meal]?.will_come
        } else {
          defaultValues[`${day}_${meal}`] = false
        }
      }
    }

    reset({ ...defaultValues })
    resetCard({ new_card: selectedVeg?.card })
  }, [selectedVeg, reset, resetCard])

  if (!selectedVeg) {
    return (
      // <NoVegSelectedContainer>
      //   <NoVegImg />
      //   <h2>Nenhum usuário selecionado...</h2>
      // </NoVegSelectedContainer>
      <SearchVegs />
    )
  }

  const handleUpdateVeg: SubmitHandler<EditVegFormData> = async (values) => {
    // const body = {
    //   card: selectedVeg.card,
    //   unusualReservations: [] as UnusualReservation[],
    //   is_permanent: values.is_permanent,
    // }
    // const unusualReservations = [] as UnusualReservation[]

    const newScheduleTable: ScheduleTable = structuredClone(
      selectedVeg.scheduleTable,
    )

    // for (const newReservation of unusualReservations) {
    //   const oldReservation =
    //     selectedVeg.scheduleTable[newReservation.day][newReservation.meal]

    //   let isPermanent = values.is_permanent

    //   if (oldReservation && !oldReservation.is_permanent) {
    //     isPermanent = true
    //   }

    //   newScheduleTable[newReservation.day][newReservation.meal] = {
    //     is_permanent: isPermanent,
    //     will_come: newReservation.will_come,
    //   }
    // }

    let changedSomething = false

    for (const day of DAYS) {
      for (const meal of ['lunch', 'dinner'] as const) {
        const key = `${day}_${meal}` as const
        const reservation = selectedVeg.scheduleTable[day][meal]

        if (values[key] !== reservation.will_come) {
          changedSomething = true
          let isPermanent = values.is_permanent

          // checar se está voltando para um estado permanente
          if (!reservation.is_permanent) {
            isPermanent = true
          }

          newScheduleTable[day][meal] = {
            is_permanent: isPermanent,
            will_come: values[key],
          }
        }
      }
    }

    if (!changedSomething) {
      toast.info('Nenhuma alteração foi feita')
      return
    }
    // if (!body.unusualReservations.length) return

    const vegRef = doc(db, 'vegs', selectedVeg.id)

    await updateDoc(vegRef, {
      scheduleTable: newScheduleTable,
    })

    toast.success('🥦 Usuário Atualizado! 🥦')

    changeSelectedVeg({
      ...selectedVeg,
      scheduleTable: newScheduleTable,
    })

    resetCard({ new_card: '0' })
  }

  const handleUpdateCard: SubmitHandler<EditVegCardFormData> = async (
    values,
  ) => {
    const vegRef = doc(db, 'vegs', selectedVeg.id)

    await updateDoc(vegRef, {
      card: values.new_card,
    })

    toast.success('🥦 Cartão Atualizado! 🥦')
  }

  async function handleDecrementAbscence() {
    if (!selectedVeg || selectedVeg.absences < 1) return

    const vegRef = doc(db, 'vegs', selectedVeg.id)

    await updateDoc(vegRef, {
      absences: selectedVeg.absences - 1,
    })

    changeSelectedVeg({ ...selectedVeg, absences: selectedVeg.absences - 1 })
  }

  async function handleDeleteVeg() {
    if (!selectedVeg) return

    const vegRef = doc(db, 'vegs', selectedVeg.id)

    await deleteDoc(vegRef)

    changeSelectedVeg(null)

    toast.success('🥦 Usuário Deletado! 🥦')
  }

  function handleCancel() {
    changeSelectedVeg(null)
  }

  async function handleToggleVegSuspension() {
    if (!selectedVeg) return

    const vegRef = doc(db, 'vegs', selectedVeg.id)

    await updateDoc(vegRef, {
      suspended: !selectedVeg.suspended,
    })

    changeSelectedVeg({ ...selectedVeg, suspended: !selectedVeg.suspended })
  }

  return (
    <EditVegContainer>
      <UnselectVeg onClick={handleCancel}>
        <ArrowLeft size={24} weight="bold" />
      </UnselectVeg>
      <EditVegForm onSubmit={handleSubmit(handleUpdateVeg)}>
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
                return (
                  <Cell
                    key={code}
                    isPermanent={
                      selectedVeg.scheduleTable[day].lunch?.is_permanent
                    }
                    fromContext
                    {...register(code)}
                  />
                )
              })}
            </tr>
            <tr>
              {DAYS.map((day) => {
                const code = `${day}_dinner` as keyof EditVegFormData
                return (
                  <Cell
                    key={code}
                    isPermanent={
                      selectedVeg.scheduleTable[day].dinner?.is_permanent
                    }
                    fromContext
                    {...register(code)}
                  />
                )
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
          <DeleteVegButton type="button" onClick={handleDeleteVeg}>
            <Trash size={16} />
          </DeleteVegButton>
        </div>
        <h2>{selectedVeg.name}</h2>
        <div>
          <p>Cartão :</p>
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
          <p>Faltas : {selectedVeg.absences}</p>
          <ChangeInfoButton type="button" onClick={handleDecrementAbscence}>
            Decrementar
          </ChangeInfoButton>
        </div>
        <div>
          <p>Suspenso: {selectedVeg.suspended ? 'Sim' : 'Não'}</p>
          <ChangeInfoButton type="button" onClick={handleToggleVegSuspension}>
            Mudar
          </ChangeInfoButton>
        </div>
        <p>Presenças : {selectedVeg.attendances}</p>
        <p>
          Porcentagem de faltas :{' '}
          {Math.round(
            calculateRatio(
              selectedVeg.absences,
              selectedVeg.attendances + selectedVeg.absences,
            ),
          )}
          %
        </p>
      </VegInfoContainer>
    </EditVegContainer>
  )
}
