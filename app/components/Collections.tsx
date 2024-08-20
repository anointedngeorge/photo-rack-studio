import React from 'react'

interface collection_list {
    id:number,
    name:string
}


const ListCollection = ({data}: {data:collection_list}) => {

    return (
        
        <div className='place-items-center'>
            <div className='flex flex-row place-items-center space-x-1 '>
                <div><p className='font-inter font-semibold text-main'>{data.name}</p></div>
                <div><input type="radio" name='collections' value={data.id} /></div>
            </div>
        </div>
       
    )
}

const Collections = () => {
    const datalist:collection_list[] = [
        {id:1, name:'Wedding Pictures'},
        {id:2, name:'Outdoor Events'},
        {id:3, name:'Church Pictures'}
    ]
  return (
        <div className='flex place-content-center mt-10'>
            <div className='p-3 w-9/12 overflow-x-scroll'>
            <div className='flex flex-row  space-x-10'>
                {datalist.map((item) => (
                    <ListCollection key={item.name} data={item} />
                ))}
            </div>
        </div>
        </div>
  )
}

export default Collections
