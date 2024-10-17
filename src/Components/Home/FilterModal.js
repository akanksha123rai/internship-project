import React,{useEffect,useState} from 'react'
import  ReactPropTypes  from 'prop-types';
import PropTypes from "prop-types";//importing for type checking props
import "../../CSS/FilterModal.css";
import "react-input-range/lib/css/index.css";
//importing CSS file for input range styling
import InputRange from "react-input-range";

const FilterModal = ({selectedFilter,onFilterChange,onClose}) => {
    const [priceRange,setPriceRange]= useState({
       min: selectedFilter.priceRange?.min ||600,
       max: selectedFilter.priceRange?.max ||30000, 
    });
   
    const [propertyType,setProperType]=useState(selectedFilter.propertyType || "" //default it is empty or the selected property type from props.select
    );

    const [roomType, setRoomType] = useState(selectedFilter.roomType || "");

    const [amenities,setAmenities] = useState(selectedFilter.amenities || []);

    //useEffect hook to update states when selectedFilter prop changes
    useEffect (() =>{
        setPriceRange({
            min:selectedFilter.priceRange?.min || 600,
            max: selectedFilter.priceRange?.max || 30000,
        });
        setProperType(selectedFilter.propertyType || "");
        setRoomType(selectedFilter.roomType || "");
        setAmenities(selectedFilter.amenities || []);
    }, [selectedFilter]);

    //function to handle to changes in price range
    const handlePriceRangeChange = (value)=> {
        setPriceRange(value) //it will update the price range state
    };

    //function to handle min value
    const handleMinInputChange = (e)=>{
        const minValue = parseInt(e.target.value,10);
        setPriceRange((prev) => ({...prev,min:minValue}))
    };

    const handleMaxInputChange = (e)=>{
        const maxValue = parseInt(e.target.value,10);
        setPriceRange((prev)=> ({...prev,max:maxValue}))
    };
 //function to handle applying filter
 const handleFilterChange =()=>{
    onFilterChange("minPrice",priceRange.min);
    onFilterChange("maxPrice",priceRange.max);
    onFilterChange("propertyType",propertyType);
    onFilterChange("roomType",roomType);
    onFilterChange("amenities",amenities);
    onClose(); //closes the modal

 };

 //option for the property type

 const propertyTypeOptions = [
    {
        value:"House", label:"House", icon:"house"
    },
    {value:"Flat",
    label:"Flat",
    icon:"apartment"
   },
    {
        value:"Guest House",
        label:"Guest House",
         icon:"hotel"
    },
    { value:"Hotel", 
    label:"Hotel",
    icon:"meeting_room"},
 ];

 //option for room types
 const roomTypeOptions = [{
    value:"Entire Room",
    label:"Entire Room",
    icon:"hotel"
 },
 {
    value:"Room",
    label:"Room",
    icon:"meeting_room"
 },
 {
    value:"AnyType",
    label:"AnyType",
    icon:"apartment"
 },
];

//option for amenities
const amenitiesOptions =[{
    value:"Wifi",
    label:"Wifi",
    icon:"wifi"
},
{
    value:"Kitchen",
     lable:"Kitchen",
     icon:"kitchen"

},
{
    value:"AC",
    lable:"AC",
    icon:"ac_unit"
},
{
    value:"Washing Machine",
    label:"Washing Machine",
    icon:"local_laundry_service"
},
{
    value:"Tv",
    label:"Tv",
    icon:"tv",
},
{
    value:"Pool",
    label:"Pool",
    icon:"pool"
},
{
    value:"Free Parking",
    label:"Free Parking",
    icon:"local_parking"
},

];

//function to handle clearing filter
const handleClearFilters = ()=>{
    setPriceRange({min:600,max:30000});
    setProperType("");
    setRoomType("");
    setAmenities([]);
}
//fun to handle change in amenities
const handleAmenitiesChange = (selectedAmenity)=>{
    setAmenities((prevAmenities)=>prevAmenities.includes(selectedAmenity)? prevAmenities.filter((item)=> item !== selectedAmenity)
    : [...prevAmenities,selectedAmenity]
    )
}
//fucntion to handle changes in propertyType
const handlePropertyTypeChange = (selectedType)=>{
    setProperType((prevType)=>
    prevType === selectedType ? "":selectedType
    )
}
//function to handle room type
const handleRoomTypeChange = (selectedType)=>{
    setRoomType((prevType)=>
    prevType === selectedType ? "":selectedType
    )
}
 

  return (
    <div className='modal-backdrop'>
        <div className='modal-content'>
            <h4>
                Filters <hr/>
            </h4>
            <button className='close-button' onClick={onClose}>
                <span>&times;</span>

            </button>

            {/* filter section */}
            <div className='modal-filters-container'>
                <div className='filter-section'>
                    <label> Price range:</label>
                    <InputRange
                     minValue={600}
                     maxValue={30000}
                     value={priceRange}
                     onChange={handlePriceRangeChange}
                    
                    
                    />
                    <div className='range-inputs'>
                        <input
                         type = "number"
                         value={priceRange.min}
                         onChange={handleMinInputChange}
                         />
                     <span></span>
                     <input
                     type="number"
                     value={priceRange.max}
                     onChange={handleMaxInputChange}
                     />

                    </div>

                </div>

               {/* propertyType filter*/}
               <div className="filter-section"> <label>Property Type: </label> <div className="icon-box"> {propertyTypeOptions.map((options) => ( <div key={options.value} className={`selectable-box ${ propertyType === options.value ? "selected" : "" }`} onClick={() => handlePropertyTypeChange(options.value)} > <span className="material-icons">{options.icon}</span> <span>{options.label}</span> </div> ))} </div>
                </div>
                {/*Room type */}
                <div className="filter-section"> <label>Room Type: </label> <div className="icon-box"> {roomTypeOptions.map((options) => ( <div key={options.value} className={`selectable-box ${ roomType === options.value ? "selected" : "" }`} onClick={() => handleRoomTypeChange(options.value)} > <span className="material-icons">{options.icon}</span> <span>{options.label}</span>
                 </div>
                  ))} 
                  </div>
                </div>
                {/*Amenities filter*/}
                <div className="filter-section"> <label>Amenities</label> <div className="amenities-checkboxes"> {amenitiesOptions.map((option) => ( <div key={option.value} className="amenity-checkbox"> {console.log(amenities.includes(option.value))}

           <input type="checkbox" value={option.value} checked={amenities.includes(option.value)} onChange={() => handleAmenitiesChange(option.value)} /> <span className="material-icons amenitieslabel"> {option.icon} </span> <span> {option.label}</span> </div> ))} 
         </div> 
        </div>

{/*filter action button */}
<div className="filter-buttons"> <button className="clear-button" onClick={handleClearFilters}> Clear </button> <button onClick={handleFilterChange}>Apply Filters</button>

</div>
                
            
                    
 </div>
 </div>
 </div> 
                  
 ); };

 FilterModal.propTypes = { 
    selectedFilters: PropTypes.object.isRequired, onFilterChange: PropTypes.func.isRequired, onClose: PropTypes.func.isRequired, 
};
              


export default FilterModal