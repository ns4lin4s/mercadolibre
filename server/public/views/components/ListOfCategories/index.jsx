import React, { Fragment, useEffect, useState } from 'react'
import { Link} from 'react-router';

function useCategoryData (q) {
  const [categories, setCategories] = useState([])
  
  useEffect(function () {
    
    window.fetch('http://localhost:3000/api/items?q=' + encodeURIComponent(q) )
      .then(res => res.json())
      .then(response => {
        setCategories(response.data.categories[0])
      })
  }, [q])

  return { categories }
}

export const ListOfCategories = (props) => {
    
    const { categories } = 
    (props.refresh != '') ? 
        useCategoryData(props.refresh) 
        :
        {categories: []}

    const click = (url) => {
        console.log(url)
        window.location.replace(url)
    }
    
    // to={`/resultados?q=${encodeURIComponent(category.name)}`}
    const renderCategories = () => (
        <div className="breadcrumb">
            <p>
            {
                categories != null && categories.length > 0 && categories.map((category,index) => {
                    return(
                        <span onClick={()=>{ click(`/resultados?q=${encodeURIComponent(category.name)}`) }}>
                        
                            { (index == categories.length - 1) ? `${category.name}` : `${category.name}  |  `}
                        
                            
                        </span>
                    )    
                })
            }
            </p>
        </div>
    )

    return (
        <Fragment>
            {renderCategories()}
        </Fragment>
    )
}
