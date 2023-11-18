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
        axios.get(`${config.apiUrl}/app/calendar`)
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
            'resource': resource.value
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
            resource: editResource.value
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
        <div className="flex flex-row w-full primaryBackground">
            <Sidebar/>
            <div className='flex flex-col w-full mt-2 mr-3 ml-3' id='main-calendar-section'>
                <div className='flex flex-col text-center items-center w-full mb-5'>
                    {formOpen ?
                        <div className='flex flex-col w-full items-center'>
                            <div>
                                <button className='outline tertiaryBackground rounded-full h-10 w-40 mr-5' onClick={handFormOpenToggle}>
                                    <span className='sameShadeColor'>Entry Form</span>
                                </button>
                                <button className='outline tertiaryBackground rounded-full h-10 w-40 ml-5' onClick={handleSearchOpenToggle}>
                                    <span className='sameShadeColor'>Edit Events</span>
                                </button>
                            </div>
                            <div className='flex flex-row w-full items-center'>
                                <div className='w-1/12'></div>
                                <div className='flex flex-col w-5/12 mt-2 mb-2'>
                                    <div>Title :</div>
                                    <input type='text' placeholder='Title' className='form-control h-10 mb-3 outline outline-1' onChange={event => setTitle(event.target.value)} />
                                    <label className='mb-3'>
                                        All Day? :
                                        <Select options={allDayOptions} onChange={setAllDay} />
                                    </label>
                                    <label>
                                        Category :
                                        <Select options={resourceOptions} onChange={setResource} />
                                    </label>
                                </div>
                                <div className='w-1/12'></div>
                                <div className='flex flex-col w-4/12'>
                                    <div>Start Date Time :</div>
                                    <DateTimePicker onChange={setStart} value={start} className='h-10' />
                                    <div className='mt-2 mb-2'></div>
                                    <div>End Date Time :</div>
                                    <DateTimePicker onChange={setEnd} value={end} className='h-10' />
                                </div>
                                <div className='w-1/12'></div>
                            </div>
                            <button onClick={addEventHandler} className='outline mt-2 mb-4 tertiaryBackground rounded-full h-10 w-40'>
                                <span className='sameShadeColor'>Add Calendar Item</span>
                            </button>
                        </div>  
                    :
                        <div>
                            <button className='outline tertiaryBackground rounded-full h-10 w-40 mr-5' onClick={handFormOpenToggle}>
                                <span className='sameShadeColor'>Enter New Event</span>
                            </button>
                            <button className='outline tertiaryBackground rounded-full h-10 w-40 ml-5' onClick={handleSearchOpenToggle}>
                                <span className='sameShadeColor'>Edit Events</span>
                            </button> 
                        </div>
                    }
                </div>
                <div>
                    {searchOpen ?
                        <div className='flex flex-col w-full items-center'>
                            <div className='flex flex-row w-full items-center'>
                                <div className='w-2/12'></div>
                                <div className='flex flex-col w-4/12'>
                                    <div>Search Title :</div>
                                    <input type='text' placeholder='Search Title' className='form-control h-10 mb-3 outline outline-1' onChange={event => setQueryTitle(event.target.value)} />
                                </div>
                                <div className='w-1/12'></div>
                                <div className='w-3/12'>
                                    <button onClick={ () => getOneEventHandler(queryTitle) } className='btn outline mt-2 mb-4 rounded-full h-10 w-40 tertiaryBackground'>
                                        <span className='sameShadeColor'>Search for Event</span>
                                    </button>
                                </div>
                                <div className='w-2/12'></div>
                            </div>
                            <div>
                                {noResultFound ? <div className=' text-red-600'>There is no result for that title: {queryTitle}</div> : ""}
                            </div>
                            <div className='flex flex-col w-6/12'>
                                <div className='mt-2'>Current Start Time:</div>
                                <DateTimePicker value={queryStart} />
                                <div className='mt-2'>Current End Time:</div>
                                <DateTimePicker value={queryEnd} />
                                <div className='flex flex-row mt-2'>
                                    <div className='mr-2'>Current All Day:</div>
                                    <div className='ml-2'>{queryAllDay ? "All Day" : "Hourly"}</div>
                                </div>
                                <div className='flex flex-row mt-2'>
                                <div className='mr-2'>Current Category:</div>
                                    <div className='ml-2'>{queryResource}</div>
                                </div>
                            </div>
                            <div className='flex flex-col w-full items-center'>
                                <div className='flex flex-row w-full items-center'>
                                    <div className='w-1/12'></div>
                                    <div className='flex flex-col w-5/12 mt-2 mb-2'>
                                        <div className='flex flex-row mt-2'>
                                            <div className='mr-2'>Title:</div>
                                            <div className='ml-2'>{queryTitle}</div>
                                        </div>
                                        <label className='mb-3'>
                                            All Day? :
                                            <Select options={allDayOptions} onChange={setEditAllDay} />
                                        </label>
                                        <label>
                                            Category :
                                            <Select options={resourceOptions} onChange={setEditResource} />
                                        </label>
                                    </div>
                                    <div className='w-1/12'></div>
                                    <div className='flex flex-col w-4/12'>
                                        <div>Start Date Time :</div>
                                        <DateTimePicker onChange={setEditStart} value={editStart} className='h-10' />
                                        <div className='mt-2 mb-2'></div>
                                        <div>End Date Time :</div>
                                        <DateTimePicker onChange={setEditEnd} value={editEnd} className='h-10' />
                                    </div>
                                    <div className='w-1/12'></div>
                                </div>
                                <button onClick={editEventHandler} className='btn outline mt-2 mb-4 rounded-full h-10 w-40'>Update Calendar Item</button>
                            </div>
                        </div> 
                    :
                        <div></div>
                    }
                </div>
                <div className='flex lg:flex-row flex-col bg-white'>
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
                        className='lg:w-9/12 w-full ml-2 mr-1'
                    />
                    <div className='flex flex-col bg-slate-800 lg:w-3/12 w-full outline ml-2 mr-2 mt-5' style={{ height: "900px", "overflow-y": "scroll" }}>
                        <div className='flex flex-row w-full bg-slate-400'>
                            <div className='w-full text-center items-center'>Event List</div>
                        </div>
                        <div className='flex flex-row w-full bg-slate-400 items-center border-b-4 border-slate-500'>
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
                        <div className='text-center bg-slate-400 border-b-4 border-slate-500'>--- --- --- --- ---</div>
                        <div className='w-full bg-slate-400 mb-5 mt-5'>
                            {schoolChecked
                            ?
                                <div>
                                    <div className='text-center'>School Items:</div>    
                                    {dataListSortedByDate.map((listItem) => (
                                        listItem.resource === "school"
                                        ?
                                        <div key={listItem.title} className='w-full'>
                                            <div className='ml-1'>Title: {listItem.title}</div>
                                            <div className='ml-1'>Start Time:</div>
                                            <DateTimePicker value={listItem.start} className="ml-1 w-8/12" />
                                            <div className='ml-1'>End Time:</div>
                                            <DateTimePicker value={listItem.end} className="ml-1 w-8/12" />
                                            <div className='flex flex-row w-full items-center text-center mt-3 mb-2 pb-3 border-b-4'>
                                                <div className='w-1/12'></div>
                                                <button className='btn outline outline-1 w-4/12 h-8 hover:bg-red-600' type='submit' onClick={ () => deleteEventHandler(listItem.title)}>Delete</button>
                                                <div className='w-2/12'></div>
                                            </div>
                                        </div> 
                                        :
                                        <div key={listItem.title}></div>
                                    ))}
                                </div>
                            :
                                <div></div>
                            }
                        </div>
                        <div className='w-full bg-slate-400 mb-5 mt-5'>
                            {workChecked
                            ?
                                <div>
                                    <div className='text-center'>Work Items:</div>    
                                    {dataListSortedByDate.map((listItem) => (
                                        listItem.resource === "work"
                                        ?
                                        <div key={listItem.title} className='w-full'>
                                            <div className='ml-1'>Title: {listItem.title}</div>
                                            <div className='ml-1'>Start Time:</div>
                                            <DateTimePicker value={listItem.start} className="ml-1 w-8/12" />
                                            <div className='ml-1'>End Time:</div>
                                            <DateTimePicker value={listItem.end} className="ml-1 w-8/12" />
                                            <div className='flex flex-row w-full items-center text-center mt-3 mb-2 pb-3 border-b-4'>
                                                <div className='w-1/12'></div>
                                                <button className='btn outline outline-1 w-4/12 h-8 hover:bg-red-600' type='submit' onClick={ () => deleteEventHandler(listItem.title)}>Delete</button>
                                                <div className='w-2/12'></div>
                                            </div>
                                        </div> 
                                        :
                                        <div key={listItem.title}></div>
                                    ))}
                                </div>
                            :
                                <div></div>
                            }
                        </div>
                        <div className='w-full bg-slate-400 mb-5 mt-5'>
                            {homeChecked
                            ?
                                <div>
                                    <div className='text-center'>Home Items:</div>    
                                    {dataListSortedByDate.map((listItem) => (
                                        listItem.resource === "home"
                                        ?
                                        <div key={listItem.title} className='w-full'>
                                            <div className='ml-1'>Title: {listItem.title}</div>
                                            <div className='ml-1'>Start Time:</div>
                                            <DateTimePicker value={listItem.start} className="ml-1 w-8/12" />
                                            <div className='ml-1'>End Time:</div>
                                            <DateTimePicker value={listItem.end} className="ml-1 w-8/12" />
                                            <div className='flex flex-row w-full items-center text-center mt-2 mb-2 pb-3 border-b-4'>
                                                <div className='w-1/12'></div>
                                                <button className='btn outline outline-1 w-4/12 h-8 hover:bg-red-600' type='submit' onClick={ () => deleteEventHandler(listItem.title)}>Delete</button>
                                                <div className='w-2/12'></div>
                                            </div>
                                        </div> 
                                        :
                                        <div key={listItem.title}></div>
                                    ))}
                                </div>
                            :
                                <div></div>
                            }
                        </div>
                        <div className='w-full bg-slate-400 mb-5 mt-5'>
                            {otherChecked
                            ?
                                <div>
                                    <div className='text-center'>Other Items:</div>    
                                    {dataListSortedByDate.map((listItem) => (
                                        listItem.resource === "other"
                                        ?
                                        <div key={listItem.title} className='w-full'>
                                            <div className='ml-1'>Title: {listItem.title}</div>
                                            <div className='ml-1'>Start Time:</div>
                                            <DateTimePicker value={listItem.start} className="ml-1 w-8/12" />
                                            <div className='ml-1'>End Time:</div>
                                            <DateTimePicker value={listItem.end} className="ml-1 w-8/12" />
                                            <div className='flex flex-row w-full items-center text-center mt-2 mb-2 pb-3 border-b-4'>
                                                <div className='w-1/12'></div>
                                                <button className='btn outline outline-1 w-4/12 h-8 hover:bg-red-600' type='submit' onClick={ () => deleteEventHandler(listItem.title)}>Delete</button>
                                                <div className='w-2/12'></div>
                                            </div>
                                        </div> 
                                        :
                                        <div key={listItem.title}></div>
                                    ))}
                                </div>
                            :
                                <div></div>
                            }
                        </div>
                    </div>
                </div>
                <div className='mt-10'></div>
            </div>
            <ThemeButton />
        </div>
    ) 
}