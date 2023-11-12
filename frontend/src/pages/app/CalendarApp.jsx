import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';
// Import React packages

// Import Sidebar component
import Sidebar from "../../components/sidebar/Sidebar";

// Import DateTime picker styling
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

// Import React Icons
import { BsFillArrowUpCircleFill, BsFillArrowDownCircleFill } from 'react-icons/bs';

// Create Localizer
const localizer = momentLocalizer(moment);

export default function CalendarApp() {
    // Variable for getting Database calendar events
    const [dataList, setDataList] = useState([])

    // UseEffect for getting database calendar events and setting to dataList
    useEffect(() => {
        axios.get('http://127.0.0.1:8000/app/calendar')
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
        axios.post('http://127.0.0.1:8000/app/calendar', {
            'title': title,
            'start': start,
            'end': end,
            'allDay': allDay.value,
            'resource': resource.value
        })
        .then(res => console.log(res))
        .then(setTimeout(function(){ window.location.reload() }, 500));
    };

    // Delete Event in Database
    const deleteEventHandler = title => {
        axios.delete(`http://127.0.0.1:8000/app/calendar/${title}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
        })
        .then(setTimeout(function(){ window.location.reload() }, 500));
    }

    // Toggle Form Entry
    const [formOpen, setFormOpen] = useState(false)

    // Handle Form Toggle
    const handFormOpenToggle = () => {
        setFormOpen(!formOpen);
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
        <div className="flex flex-row w-full bg-white">
            <Sidebar/>
            <div className='flex flex-col w-full mt-2 mr-3' id='main-calendar-section'>
                <div className='flex flex-col text-center items-center w-full mb-5'>
                    {formOpen ?
                        <div className='flex flex-col w-full items-center'>
                            <BsFillArrowUpCircleFill onClick={handFormOpenToggle} className='mb-1 mt-1 h-10 w-10' />
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
                            <button onClick={addEventHandler} className='btn outline mt-2 mb-4 bg-blue-500 hover:bg-blue-700 rounded-full h-10 w-40'>Add Calendar Item</button>
                        </div>  
                    :
                        <BsFillArrowDownCircleFill onClick={handFormOpenToggle} className='mb-5 mt-1 h-10 w-10' />    
                    }
                </div>
                <div className='flex lg:flex-row flex-col'>
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
                        className='lg:w-9/12 w-full ml-2'
                    />
                    <div className='flex flex-col bg-slate-800 lg:w-3/12 w-full outline ml-2 mr-2 mt-5'>
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
                                                <button className='btn outline outline-1 w-4/12 h-8 hover:bg-blue-600' type='submit' onClick={ () => deleteEventHandler(listItem.title)}>Update</button>
                                                <div className='w-1/12'></div>
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
                                    {dataList.map((listItem) => (
                                        listItem.resource === "work"
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
                                                <button className='btn outline outline-1 w-4/12 h-8 hover:bg-blue-600' type='submit' onClick={ () => deleteEventHandler(listItem.title)}>Update</button>
                                                <div className='w-1/12'></div>
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
                                    {dataList.map((listItem) => (
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
                                                <button className='btn outline outline-1 w-4/12 h-8 hover:bg-blue-600' type='submit' onClick={ () => deleteEventHandler(listItem.title)}>Update</button>
                                                <div className='w-1/12'></div>
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
                                    {dataList.map((listItem) => (
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
                                                <button className='btn outline outline-1 w-4/12 h-8 hover:bg-blue-600' type='submit' onClick={ () => deleteEventHandler(listItem.title)}>Update</button>
                                                <div className='w-1/12'></div>
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
            </div>
        </div>
    ) 
}