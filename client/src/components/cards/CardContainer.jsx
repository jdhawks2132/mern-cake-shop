import CakeCard from './CakeCard'

const CardContainer = ({cakes, page}) => {
  const cakeCards = cakes.map(cake => {
    return (
      <CakeCard cake={cake} key={cake._id} page={page} />
    )
  })

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 m-11'>
      {cakeCards}
    </div>
  )
}

export default CardContainer