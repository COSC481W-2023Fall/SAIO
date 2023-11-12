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
    };

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
            <div className='flex flex-col w-full mt-2' id='main-calendar-section'>
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
                <div className='flex md:flex-row flex-col'>
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
                        className='md:w-9/12 w-full ml-2'
                    />
                    <div className='flex flex-col bg-slate-800 md:w-3/12 w-full'>
                        <div className='flex flex-row w-full bg-slate-400'>
                            <div className='w-full text-center items-center'>Event List</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) 
}