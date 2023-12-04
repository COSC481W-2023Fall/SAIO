import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';
// Import React packages

// Import Sidebar component
import Sidebar from "../../components/sidebar/Sidebar";

// Import Config
import config from '../../config';

// Import DateTime picker styling
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

// Import React Icons
// import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';

// Import Theme Button
import ThemeButton from '../../components/ThemeButton';

// Create Localizer
const localizer = momentLocalizer(moment);

export default function CalendarApp() {
    // Variable for getting Database calendar events
    const [dataList, setDataList] = useState([])

    // UseEffect for getting database calendar events and setting to dataList
    useEffect(() => {
        
        axios.get(`${config.apiUrl}/app/calendar${localStorage.getItem('token')}`)
        .then(res => {
            setDataList(res.data)
        })
    }, []);

    // Variable for Sorted Array
    const dataListSortedByDate = [...dataList].sort((a, b) => a.title > b.title ? 1 : -1,);

    // Iterates over the dataList and converts the date string to a DateTime
    const appointments = dataList.map(appointment =>({
        title: appointment.title,
        start: new Date(appointment.start), 
        end: new Date(appointment.end), 
        allDay: appointment.allDay,
        resource: appointment.resource
    }))

    // Create a new Event Item
    const [title, setTitle] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [allDay, setAllDay] = useState();
    const [resource, setResource] = useState("");

    // Query Event Item
    const [queryTitle, setQueryTitle] = useState("");
    const [queryStart, setQueryStart] = useState(new Date());
    const [queryEnd, setQueryEnd] = useState(new Date());
    const [queryAllDay, setQueryAllDay] = useState();
    const [queryResource, setQueryResource] = useState("");

    // Edit Event Item
    const [editStart, setEditStart] = useState(new Date());
    const [editEnd, setEditEnd] = useState(new Date());
    const [editAllDay, setEditAllDay] = useState(false);
    const [editResource, setEditResource] = useState("");

    // Category Resource options
    const resourceOptions = [
        { value: 'school', label: 'School' },
        { value: 'work', label: 'Work' },
        { value: 'home', label: 'Home' },
        { value: 'other', label: 'Other' }
    ]

    // All Day Options
    const allDayOptions = [
        { value: true, label: "All Day" },
        { value: false, label: "Hourly" }
    ]

    // Add new Event to the Database
    const addEventHandler = () => {
        axios.post(`${config.apiUrl}/app/calendar`, {
            'title': title,
            'start': start,
            'end': end,
            'allDay': allDay.value,
            'resource': resource.value,
            'email': localStorage.getItem('token')
        })
        .then(res => console.log(res))
        .then(setTimeout(function(){ window.location.reload() }, 500));
    };

    // Get 1 Event for Search
    const getOneEventHandler = titleName => {
        axios.get(`${config.apiUrl}/app/calendar/${titleName}`)
        .then(res => {
            setQueryStart(new Date(res.data.start))
            setQueryEnd(new Date(res.data.end))
            setQueryAllDay(res.data.allDay)
            setQueryResource(res.data.resource)
            setNoResultFound(false)
        })
        .catch((error) => {
            setNoResultFound(true);
            console.error('There was no result with that title!', error);
        })
    }
    
    // No Result Found Error
    const [noResultFound, setNoResultFound] = useState(false);

    // Update/Edit Event in Database
    const editEventHandler = () => {
        axios.put(`${config.apiUrl}/app/calendar/${queryTitle}`, 
        {
            title: queryTitle,
            start: editStart,
            end: editEnd,
            allDay: editAllDay.value,
            resource: editResource.value,
            email: localStorage.getItem('token')
        })
        .then(res => console.log(res.data))
        .then(setTimeout(function(){ window.location.reload() }, 500))
        .catch(err => console.log(err))
    }

    // Delete Event in Database
    const deleteEventHandler = titleName => {
        axios.delete(`${config.apiUrl}/app/calendar/${titleName}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .then(setTimeout(function(){ window.location.reload() }, 500));
    }

    // Toggle Form Entry
    const [formOpen, setFormOpen] = useState(false)

    // Toggle Search Form
    const [searchOpen, setSearchOpen] = useState(false)

    // Handle Form Toggle
    const handFormOpenToggle = () => {
        setFormOpen(!formOpen);
        setSearchOpen(false);
    }
    
    // Handle Search Open
    const handleSearchOpenToggle = () => {
        setSearchOpen(!searchOpen);
        setFormOpen(false);
    }

    // Checkbox Statuses
    const [schoolChecked, setSchoolChecked] = useState(true);
    const [workChecked, setWorkChecked] = useState(true);
    const [homeChecked, setHomeChecked] = useState(true);
    const [otherChecked, setOtherChecked] = useState(true);

    // Handle Checkbox Changing
    const handleSchoolChange = () => {
        setSchoolChecked(!schoolChecked);
    };
    const handleWorkChange = () => {
        setWorkChecked(!workChecked);
    };
    const handleHomeChange = () => {
        setHomeChecked(!homeChecked);  
    };
    const handleOtherChange = () => {
        setOtherChecked(!otherChecked);
    };

    return (
        <main id="main" className="relative flex flex-row w-full primaryBackground">
            <div className='flex flex-col w-full mt-2 mr-5 ml-5' id='main-calendar-section'>
                <div className='flex flex-row mb-3'>
                    <div className='text-2xl oppositeShadeColor'>
                        SAIO - Calendar
                    </div>
                    <div className='ml-3 mr-5 mt-1 tertiaryColor'>
                        An App for entering and saving all of your appointments
                    </div>
                    <div className='mr-5'></div>
                </div>
                <div className='flex flex-col text-center items-center w-full mb-5'>
                    {formOpen ?
                        <div className='flex flex-col w-full items-center'>
                            <div>
                                <button className='outline tertiaryBackground fifthColor rounded-full mr-5' onClick={handFormOpenToggle} style={{ width: "200px"}}>
                                    <span className='sameShadeColor'>Entry Form</span>
                                </button>
                                <button className='outline tertiaryBackground fifthColor rounded-full ml-5' onClick={handleSearchOpenToggle} style={{ width: "200px"}}>
                                    <span className='sameShadeColor'>Edit Events</span>
                                </button>
                            </div>
                            <div className='sixthColor mt-3 mb-2'>
                                This is a form for entering new events to the Calendar. Click <span className='tertiaryColor'>&quot;Add Calendar Item&quot;</span> when done.
                            </div>
                            <div className='flex flex-row w-full items-center'>
                                <div className='w-1/12'></div>
                                <div className='flex flex-col w-5/12 mt-2 mb-2'>
                                    <div className='oppositeShadeColor'>Title :</div>
                                    <input type='text' placeholder='Title' required className='form-control h-10 mb-3 outline outline-1' onChange={event => setTitle(event.target.value)} />
                                    <label className='mb-3 oppositeShadeColor'>
                                        All Day? :
                                        <Select options={allDayOptions} onChange={setAllDay} className='fifthColor'/>
                                    </label>
                                    <label className='oppositeShadeColor'>
                                        Category :
                                        <Select options={resourceOptions} onChange={setResource} className='fifthColor oppositeShadeBackground' />
                                    </label>
                                </div>
                                <div className='w-1/12'></div>
                                <div className='flex flex-col w-4/12'>
                                    <div className='oppositeShadeColor'>Start Date Time :</div>
                                    <DateTimePicker onChange={setStart} value={start} className='h-10 fifthBackground oppositeShadeColor' />
                                    <div className='mt-2 mb-2'></div>
                                    <div className='oppositeShadeColor'>End Date Time :</div>
                                    <DateTimePicker onChange={setEnd} value={end} className='h-10 fifthBackground oppositeShadeColor' />
                                </div>
                                <div className='w-1/12'></div>
                            </div>
                            <button onClick={addEventHandler} className='outline mt-2 mb-4 tertiaryBackground fifthColor rounded-full' style={{ width: "200px"}}>
                                <span className='sameShadeColor'>Add Calendar Item</span>
                            </button>
                        </div>  
                    :
                        <div>
                            <button className='outline tertiaryBackground fifthColor rounded-full mr-5' onClick={handFormOpenToggle} style={{ width: "200px"}}>
                                <span className='sameShadeColor'>Enter New Event</span>
                            </button>
                            <button className='outline tertiaryBackground fifthColor rounded-full ml-5' onClick={handleSearchOpenToggle} style={{ width: "200px"}}>
                                <span className='sameShadeColor'>Edit Events</span>
                            </button> 
                        </div>
                    }
                </div>
                <div>
                    {searchOpen ?
                        <div className='flex flex-col w-full items-center'>
                            <div className='sixthColor mt-3 mb-2'>
                                This is a form for searching & editing events in the Calendar. Click <span className='tertiaryColor'>&quot;Add Calendar Item&quot;</span> when done.
                            </div>
                            <div className='sixthColor mt-3 mb-2'>
                                Events are searched by title with the <span className='tertiaryColor'>&quot;Search for Event&quot;</span> button, results displayed below.
                            </div>
                            <div className='sixthColor mt-3 mb-2'>
                                Values can be changed in the entry form and updated with the <span className='tertiaryColor'>&quot;Update Calendar Item&quot;</span> button.
                            </div>
                            <div className='flex flex-row w-9/12 items-center'>
                                <div className='w-2/12'></div>
                                <div className='flex flex-col w-4/12'>
                                    <div className='oppositeShadeColor'>Search Title :</div>
                                    <input type='text' placeholder='Search Title' required className='form-control h-10 mb-3 outline outline-1' onChange={event => setQueryTitle(event.target.value)} />
                                </div>
                                <div className='w-1/12'></div>
                                <div className='w-3/12'>
                                    <button onClick={ () => getOneEventHandler(queryTitle) } className='outline mt-2 mb-4 rounded-full tertiaryBackground fifthColor' style={{ width: "200px"}}>
                                        <span className='sameShadeColor'>Search for Event</span>
                                    </button>
                                </div>
                                <div className='w-2/12'></div>
                            </div>
                            <div>
                                {noResultFound ? <div className='oppositeShadeColor'>There is no result for that title: {queryTitle}</div> : ""}
                            </div>
                            <div className='flex flex-col w-6/12'>
                                <div className='mt-2 oppositeShadeColor'>Current Start Time:</div>
                                <DateTimePicker value={queryStart} className="fifthBackground oppositeShadeColor" />
                                <div className='mt-2 oppositeShadeColor'>Current End Time:</div>
                                <DateTimePicker value={queryEnd} className="fifthBackground oppositeShadeColor" />
                                <div className='flex flex-row mt-2'>
                                    <div className='mr-2 oppositeShadeColor'>Current All Day:</div>
                                    <div className='ml-2 oppositeShadeColor'>{queryAllDay ? "All Day" : "Hourly"}</div>
                                </div>
                                <div className='flex flex-row mt-2'>
                                <div className='mr-2 oppositeShadeColor'>Current Category:</div>
                                    <div className='ml-2 oppositeShadeColor'>{queryResource}</div>
                                </div>
                            </div>
                            <div className='flex flex-col w-full items-center'>
                                <div className='flex flex-row w-full items-center'>
                                    <div className='w-1/12'></div>
                                    <div className='flex flex-col w-5/12 mt-2 mb-2'>
                                        <div className='flex flex-row mt-2'>
                                            <div className='mr-2 oppositeShadeColor'>Title:</div>
                                            <div className='ml-2 oppositeShadeColor'>{queryTitle}</div>
                                        </div>
                                        <label className='mb-3 oppositeShadeColor'>
                                            All Day? :
                                            <Select options={allDayOptions} onChange={setEditAllDay} className='fifthColor' />
                                        </label>
                                        <label className='oppositeShadeColor'>
                                            Category :
                                            <Select options={resourceOptions} onChange={setEditResource} className='fifthColor' />
                                        </label>
                                    </div>
                                    <div className='w-1/12'></div>
                                    <div className='flex flex-col w-4/12'>
                                        <div className='flex flex-row mt-2'>
                                            <div className='mr-2 oppositeShadeColor'><span className='primaryColor'>.</span></div>
                                            <div className='ml-2 oppositeShadeColor'><span className='primaryColor'>.</span></div>
                                        </div>
                                        <div className='oppositeShadeColor'>Start Date Time :</div>
                                        <DateTimePicker onChange={setEditStart} value={editStart} className='h-10 fifthBackground oppositeShadeColor' />
                                        <div className='mt-2 mb-2'></div>
                                        <div className='oppositeShadeColor'>End Date Time :</div>
                                        <DateTimePicker onChange={setEditEnd} value={editEnd} className='h-10 fifthBackground oppositeShadeColor' />
                                    </div>
                                    <div className='w-1/12'></div>
                                </div>
                                <button onClick={editEventHandler} className='outline mt-2 mb-4 rounded-full tertiaryBackground fifthColor' style={{ width: "200px"}}>
                                    <span className='sameShadeColor'>Update Calendar Item</span>
                                </button>
                            </div>
                        </div> 
                    :
                        <div></div>
                    }
                </div>
                <div className='flex lg:flex-row flex-col tertiaryBackground pt-2 pb-2'>
                    <Calendar 
                        localizer={localizer}
                        events={appointments}
                        titleAccessor='title'
                        startAccessor="start"
                        endAccessor="end"
                        allDayAccessor="allDay"
                        resourceAccessor='resource'
                        defaultView='week'
                        style={{ height: 900 }}
                        className='lg:w-9/12 w-full ml-2 mr-1 bg-white outline'
                    />
                    <div className='flex flex-col secondaryBackground lg:w-3/12 w-full outline ml-2 mr-2' style={{ height: "900px", "overflowY": "scroll" }}>
                        <div className='flex flex-row w-full secondaryBackground'>
                            <div className='w-full text-center items-center sixthColor'>All Items in the Calendar</div>
                        </div>
                        <div className='flex flex-row w-full secondaryBackground'>
                            <div className='w-full text-center items-center sixthColor'>Sorted Alphabetically by Category</div>
                        </div>
                        <div className='flex flex-row w-full secondaryBackground'>
                            <div className='w-full text-center items-center sixthColor'>Show or Hide categories with Checkboxes</div>
                        </div>
                        <div className='flex flex-row w-full secondaryBackground items-center oppositeShadeColor'>
                            <div className='w-1/12'></div>
                            <div className='flex flex-col w-5/12'>
                                <label>
                                    <input type='checkbox' checked={schoolChecked} onChange={handleSchoolChange} className='mr-1' />
                                    School
                                </label>
                                <label>
                                    <input type='checkbox' checked={workChecked} onChange={handleWorkChange} className='mr-1' />
                                    Work
                                </label>
                            </div>
                            <div className='flex flex-col w-5/12'>
                                <label>
                                    <input type='checkbox' checked={homeChecked} onChange={handleHomeChange} className='mr-1' />
                                    Home
                                </label>
                                <label>
                                    <input type='checkbox' checked={otherChecked} onChange={handleOtherChange} className='mr-1' />
                                    Other
                                </label>
                            </div>
                            <div className='w-1/12'></div>
                        </div>
                        <div className='text-center fourthBackground'>--- --- --- --- ---</div>
                        <div className='w-full secondaryBackground mb-5 mt-5'>
                            {schoolChecked
                            ?
                                <div>
                                    <div className='text-center oppositeShadeColor'>School Items:</div>    
                                    {dataListSortedByDate.map((listItem) => (
                                        listItem.resource === "school"
                                        ?
                                        <div key={listItem.title} className='w-full'>
                                            <div className='ml-1 oppositeShadeColor'>Title: {listItem.title}</div>
                                            <div className='ml-1 oppositeShadeColor'>Start Time:</div>
                                            <DateTimePicker value={listItem.start} className="ml-1 w-9/12 fifthBackground oppositeShadeColor" />
                                            <div className='ml-1 oppositeShadeColor'>End Time:</div>
                                            <DateTimePicker value={listItem.end} className="ml-1 w-9/12 fifthBackground oppositeShadeColor" />
                                            <div className='flex flex-row w-full items-center text-center mt-3 mb-2 pb-3 border-b-4'>
                                                <div className='w-1/12'></div>
                                                <button className='outline outline-1 sixthColor fourthBackground hover:bg-red-600' type='submit' onClick={ () => deleteEventHandler(listItem.title)}>
                                                    <span className='oppositeShadeColor'>Delete</span>
                                                </button>
                                                <div className='w-2/12'></div>
                                            </div>
                                        </div> 
                                        :
                                        <div key={listItem.title}></div>
                                    ))}
                                </div>
                            :
                                <span></span>
                            }
                        </div>
                        <div className='w-full mb-5 mt-5'>
                            {workChecked
                            ?
                                <div>
                                    <div className='text-center oppositeShadeColor'>Work Items:</div>    
                                    {dataListSortedByDate.map((listItem) => (
                                        listItem.resource === "work"
                                        ?
                                        <div key={listItem.title} className='w-full'>
                                            <div className='ml-1 oppositeShadeColor'>Title: {listItem.title}</div>
                                            <div className='ml-1 oppositeShadeColor'>Start Time:</div>
                                            <DateTimePicker value={listItem.start} className="ml-1 w-9/12 fifthBackground oppositeShadeColor" />
                                            <div className='ml-1 oppositeShadeColor'>End Time:</div>
                                            <DateTimePicker value={listItem.end} className="ml-1 w-9/12 fifthBackground oppositeShadeColor" />
                                            <div className='flex flex-row w-full items-center text-center mt-3 mb-2 pb-3 border-b-4'>
                                                <div className='w-1/12'></div>
                                                <button className='outline outline-1 sixthColor fourthBackground hover:bg-red-600' type='submit' onClick={ () => deleteEventHandler(listItem.title)}>
                                                    <span className='oppositeShadeColor'>Delete</span>
                                                </button>
                                                <div className='w-2/12'></div>
                                            </div>
                                        </div> 
                                        :
                                        <div key={listItem.title}></div>
                                    ))}
                                </div>
                            :
                                <span></span>
                            }
                        </div>
                        <div className='w-full mb-5 mt-5'>
                            {homeChecked
                            ?
                                <div>
                                    <div className='text-center oppositeShadeColor'>Home Items:</div>    
                                    {dataListSortedByDate.map((listItem) => (
                                        listItem.resource === "home"
                                        ?
                                        <div key={listItem.title} className='w-full'>
                                            <div className='ml-1 oppositeShadeColor'>Title: {listItem.title}</div>
                                            <div className='ml-1 oppositeShadeColor'>Start Time:</div>
                                            <DateTimePicker value={listItem.start} className="ml-1 w-9/12 fifthBackground oppositeShadeColor" />
                                            <div className='ml-1 oppositeShadeColor'>End Time:</div>
                                            <DateTimePicker value={listItem.end} className="ml-1 w-9/12 fifthBackground oppositeShadeColor" />
                                            <div className='flex flex-row w-full items-center text-center mt-2 mb-2 pb-3 border-b-4'>
                                                <div className='w-1/12'></div>
                                                <button className='outline outline-1 sixthColor fourthBackground hover:bg-red-600' type='submit' onClick={ () => deleteEventHandler(listItem.title)}>
                                                    <span className='oppositeShadeColor'>Delete</span>
                                                </button>
                                                <div className='w-2/12'></div>
                                            </div>
                                        </div> 
                                        :
                                        <div key={listItem.title}></div>
                                    ))}
                                </div>
                            :
                                <span></span>
                            }
                        </div>
                        <div className='w-full mb-5 mt-5'>
                            {otherChecked
                            ?
                                <div>
                                    <div className='text-center oppositeShadeColor'>Other Items:</div>    
                                    {dataListSortedByDate.map((listItem) => (
                                        listItem.resource === "other"
                                        ?
                                        <div key={listItem.title} className='w-full'>
                                            <div className='ml-1 oppositeShadeColor'>Title: {listItem.title}</div>
                                            <div className='ml-1 oppositeShadeColor'>Start Time:</div>
                                            <DateTimePicker value={listItem.start} className="ml-1 w-9/12 fifthBackground oppositeShadeColor" />
                                            <div className='ml-1 oppositeShadeColor'>End Time:</div>
                                            <DateTimePicker value={listItem.end} className="ml-1 w-9/12 fifthBackground oppositeShadeColor" />
                                            <div className='flex flex-row w-full items-center text-center mt-2 mb-2 pb-3 border-b-4'>
                                                <div className='w-1/12'></div>
                                                <button className='outline outline-1 sixthColor fourthBackground hover:bg-red-600' type='submit' onClick={ () => deleteEventHandler(listItem.title)}>
                                                    <span className='oppositeShadeColor'>Delete</span>
                                                </button>
                                                <div className='w-2/12'></div>
                                            </div>
                                        </div> 
                                        :
                                        <div key={listItem.title}></div>
                                    ))}
                                </div>
                            :
                                <span></span>
                            }
                        </div>
                    </div>
                </div>
                <div className='mt-10'></div>
            </div>
        </main>
    ) 
}