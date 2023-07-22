import CakeCard from './CakeCard'

const CardContainer = ({cakes, page}) => {

  console.log(cakes)

  const cakeCards = cakes.map(cake => {
    return (
      <CakeCard cake={cake} key={cake._id} page={page} />
    )
  })

  return (
    // style as grid with tailwindcss
    <div className='grid grid-cols-3 gap-4 m-11'>
      {cakeCards}
    </div>
  )
}
export default CardContainer