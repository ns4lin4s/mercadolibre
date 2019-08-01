import React, { Fragment, useEffect, useState } from 'react'
import {Item}  from '../Item/index'

function useItemsData (q) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(function () {
    setLoading(true)
    window.fetch('http://localhost:3000/api/items?q=' + encodeURIComponent(q))
      .then(res => res.json())
      .then(response => {
        setItems(response.data.items)
        setLoading(false)
      })
  }, [q])

  return { items, loading }
}

export const ListOfItems = (props) => {
    
    const { items, loading } = 
    (props.refresh != '') ? 
        useItemsData(props.refresh) 
        :
        {items: [],loading :false}
    
    const renderList = () => (
        <div className="list-item">
        {
            loading
            ? <span>cargando..</span>
            : items.map(item => <Item {...item} />)
        }
        </div>
    )

    return (
        <Fragment>
        {renderList()}
        </Fragment>
    )
}
