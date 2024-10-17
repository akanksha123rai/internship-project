import React, { useEffect, useState } from 'react'
import FilterModal from './FilterModal';
import { UseDispatch, useDispatch } from 'react-redux';
import { getAllProperties } from '../../Store/Property/property-action';
import { propertyAction } from '../../Store/Property/property-slice';

const Filter = () => {
    //state for controlling modal visability
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [selectedFilter, setSelectedFilters]= useState({});
 
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(propertyAction.updateSearchParams(selectedFilter));
        dispatch(getAllProperties())
    }, [selectedFilter,dispatch]);

    //function to handle opening the modal/popupwindow
    const handleOpenModal = ()=>{
        setIsModalOpen(true); //sets ismodalopen to true to open the modal
    }
    
        const handleCloseModal = ()=>{
            setIsModalOpen(false);
        }
        //function to handle changes in  filter
        const handleFilterChange =(filterName,value)=>{
            //update the selected filters with the new values
            setSelectedFilters((prevFilters)=> ({
                ...prevFilters,
                [filterName]: value,

            }));
        }
    
  return (
    <>
    {/*click event to open the modal*/}
    <span class="material-symbols-outlined filter" onClick={handleOpenModal}>
tune
</span>
{isModalOpen && 
(<FilterModal
 selectedFilter={selectedFilter}
 onFilterChange={handleFilterChange}
 onClose={handleCloseModal}


/> )}


    </>
  )
}

export default Filter