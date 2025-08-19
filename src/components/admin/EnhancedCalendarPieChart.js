// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
// import { FaCalendarAlt, FaUsers, FaEnvelope, FaChartPie, FaSync } from 'react-icons/fa';
// import { calendarAPI, contactsAPI, applicationsAPI, subscribeToUpdates } from '../../services/api';

// const DashboardContainer = styled.div`
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   gap: 20px;
//   padding: 20px;
//   height: calc(100vh - 120px);
//   overflow: hidden;

//   @media (max-width: 768px) {
//     grid-template-columns: 1fr;
//     height: auto;
//   }
// `;

// const LeftPanel = styled.div`
//   background: white;
//   border-radius: 15px;
//   padding: 25px;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//   overflow-y: auto;
// `;

// const RightPanel = styled.div`
//   background: white;
//   border-radius: 15px;
//   padding: 25px;
//   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   overflow-y: auto;
// `;

// const CalendarHeader = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 20px;
// `;

// const MonthYearSelector = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 15px;
// `;

// const Select = styled.select`
//   padding: 8px 12px;
//   border: 1px solid #ddd;
//   border-radius: 5px;
//   font-size: 14px;
//   background: white;
// `;

// const CalendarGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(7, 1fr);
//   gap: 2px;
//   margin-top: 10px;
// `;

// const WeekdayHeader = styled.div`
//   text-align: center;
//   font-weight: bold;
//   padding: 10px;
//   background: #f8f9fa;
//   color: #666;
//   font-size: 12px;
// `;

// const DayCell = styled.div`
//   aspect-ratio: 1;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   border: 1px solid #eee;
//   cursor: pointer;
//   transition: all 0.3s ease;
//   font-size: 14px;
//   position: relative;
//   background: ${props => props.isToday ? '#667eea' : props.isSelected ? '#e3f2fd' : 'white'};
//   color: ${props => props.isToday ? 'white' : '#333'};
//   font-weight: ${props => props.isToday ? 'bold' : 'normal'};

//   &:hover {
//     background: #f0f0f0;
//     transform: scale(1.05);
//   }

//   &.has-activity {
//     background: #ffd700;
//     color: #333;
//   }

//   &.has-activity::after {
//     content: '';
//     position: absolute;
//     top: 2px;
//     right: 2px;
//     width: 6px;
//     height: 6px;
//     background: #ff4757;
//     border-radius: 50%;
//   }
// `;

// const ChartContainer = styled.div`
//   background: #f8f9fa;
//   border-radius: 10px;
//   padding: 20px;
//   height: 250px;
// `;

// const ChartTitle = styled.h3`
//   margin: 0 0 15px 0;
//   color: #333;
//   font-size: 1.1rem;
//   display: flex;
//   align-items: center;
//   gap: 10px;
// `;

// const RefreshButton = styled.button`
//   background: #667eea;
//   color: white;
//   border: none;
//   padding: 8px 16px;
//   border-radius: 5px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 5px;
//   font-size: 12px;

//   &:hover {
//     background: #764ba2;
//   }
// `;

// const ActivityDetails = styled.div`
//   margin-top: 20px;
//   padding: 15px;
//   background: #f8f9fa;
//   border-radius: 8px;
// `;

// const ActivityItem = styled.div`
//   padding: 8px;
//   margin: 5px 0;
//   background: white;
//   border-radius: 5px;
//   border-left: 3px solid #667eea;
// `;

// const EnhancedCalendarPieChart = () => {
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const [selectedDate, setSelectedDate] = useState(new Date().getDate());
//   const [calendarData, setCalendarData] = useState([]);
//   const [contactData, setContactData] = useState([]);
//   const [applicationData, setApplicationData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedActivities, setSelectedActivities] = useState([]);

//   const months = [
//     'January', 'February', 'March', 'April', 'May', 'June',
//     'July', 'August', 'September', 'October', 'November', 'December'
//   ];

//   const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//   // Fetch calendar data
//   const fetchCalendarData = async () => {
//     try {
//       const data = await calendarAPI.getEvents(currentDate.getMonth(), currentDate.getFullYear());
//       setCalendarData(data);
//     } catch (error) {
//       console.error('Error fetching calendar data:', error);
//     }
//   };

//   // Fetch contact data
//   const fetchContactData = async () => {
//     try {
//       const data = await contactsAPI.getSummary();
//       setContactData(data);
//     } catch (error) {
//       console.error('Error fetching contact data:', error);
//     }
//   };

//   // Fetch application data
//   const fetchApplicationData = async () => {
//     try {
//       const data = await applicationsAPI.getSummary();
//       setApplicationData(data);
//     } catch (error) {
//       console.error('Error fetching application data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, [currentDate]);

//   const fetchData = async () => {
//     setLoading(true);
//     await Promise.all([
//       fetchCalendarData(),
//       fetchContactData(),
//       fetchApplicationData()
//     ]);
//     setLoading(false);
//   };

//   const getDaysInMonth = (year, month) => {
//     return new Date(year, month + 1, 0).getDate();
//   };

//   const getFirstDayOfMonth = (year, month) => {
//     return new Date(year, month, 1).getDay();
//   };

//   const generateCalendarDays = () => {
//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth();
//     const daysInMonth = getDaysInMonth(year, month);
//     const firstDay = getFirstDayOfMonth(year, month);
    
//     const days = [];
    
//     // Add empty cells for days before the first day of the month
//     for (let i = 0; i < firstDay; i++) {
//       days.push(null);
//     }
    
//     // Add actual days
//     for (let day = 1; day <= daysInMonth; day++) {
//       days.push(day);
//     }
    
//     return days;
//   };

//   const handleMonthChange = (e) => {
//     const newMonth = parseInt(e.target.value);
//     setCurrentDate(new Date(currentDate.getFullYear(), newMonth, 1));
//   };

//   const handleYearChange = (e) => {
//     const newYear = parseInt(e.target.value);
//     setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
//   };

//   const handleDateClick = (day) => {
//     if (day) {
//       setSelectedDate(day);
//       const selectedDateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//       const activities = calendarData.filter(item => item.date === selectedDateStr);
//       setSelectedActivities(activities);
//     }
//   };

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div style={{
//           background: 'white',
//           padding: '10px',
//           border: '1px solid #ddd',
//           borderRadius: '5px',
//           boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
//         }}>
//           <p style={{ margin: 0 }}>{`${payload[0].name}: ${payload[0].value}`}</p>
//         </div>
//       );
//     }
//     return null;
//   };

//   const calendarDays = generateCalendarDays();
//   const currentYear = currentDate.getFullYear();
//   const currentMonth = currentDate.getMonth();

//   const hasActivity = (day) => {
//     const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//     return calendarData.some(item => item.date === dateStr);
//   };

//   return (
//     <DashboardContainer>
//       {loading && (
//         <div style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'rgba(255,255,255,0.8)',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           zIndex: 1000
//         }}>
//           <div>Loading dashboard...</div>
//         </div>
//       )}

//       {/* Left Panel - Calendar with Active Data */}
//       <LeftPanel>
//         <CalendarHeader>
//           <h2 style={{ margin: 0, color: '#333' }}>
//             <FaCalendarAlt style={{ marginRight: '10px' }} />
//             Calendar with Active Data
//           </h2>
//           <RefreshButton onClick={fetchData}>
//             <FaSync /> Refresh
//           </RefreshButton>
//         </CalendarHeader>
        
//         <MonthYearSelector>
//           <Select value={currentMonth} onChange={handleMonthChange}>
//             {months.map((month, index) => (
//               <option key={index} value={index}>{month}</option>
//             ))}
//           </Select>
          
//           <Select value={currentYear} onChange={handleYearChange}>
//             {Array.from({ length: 21 }, (_, i) => currentYear - 10 + i).map(year => (
//               <option key={year} value={year}>{year}</option>
//             ))}
//           </Select>
//         </MonthYearSelector>

//         <CalendarHeader>
//           {weekdays.map(day => (
//             <WeekdayHeader key={day}>{day}</WeekdayHeader>
//           ))}
//         </CalendarHeader>

//         <CalendarGrid>
//           {calendarDays.map((day, index) => (
//             <DayCell
//               key={index}
//               isToday={day === new Date().getDate() && 
//                        currentMonth === new Date().getMonth() && 
//                        currentYear === new Date().getFullYear()}
//               isSelected={day === selectedDate}
//               className={hasActivity(day) ? 'has-activity' : ''}
//               onClick={() => handleDateClick(day)}
//             >
//               {day || ''}
//             </DayCell>
//           ))}
//         </CalendarGrid>

//         <ActivityDetails>
//           <h4>Selected Date: {selectedDate} {months[currentMonth]} {currentYear}</h4>
//           {selectedActivities.length > 0 ? (
//             selectedActivities.map((activity, index) => (
//               <ActivityItem key={index}>
//                 <strong>{activity.type === 'meeting' ? '📅 Meeting' : '✅ Task'}</strong>
//                 <span> - {activity.events} events</span>
//               </ActivityItem>
//             ))
//           ) : (
//             <p>No activities for this date</p>
//           )}
//         </ActivityDetails>
//       </LeftPanel>

//       {/* Right Panel - Pie Charts */}
//       <RightPanel>
//         <ChartContainer>
//           <ChartTitle>
//             <FaEnvelope style={{ color: '#667eea' }} />
//             Contact Distribution
//           </ChartTitle>
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={contactData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {contactData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip content={<CustomTooltip />} />
//             </PieChart>
//           </ResponsiveContainer>
//         </ChartContainer>

//         <ChartContainer>
//           <ChartTitle>
//             <FaUsers style={{ color: '#764ba2' }} />
//             Applications Usage
//           </ChartTitle>
//           <ResponsiveContainer width="100%" height="100%">
//             <PieChart>
//               <Pie
//                 data={applicationData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//               >
//                 {applicationData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={entry.color} />
//                 ))}
//               </Pie>
//               <Tooltip content={<CustomTooltip />} />
//             </PieChart>
//           </ResponsiveContainer>
//         </ChartContainer>

//         <div style={{ 
//           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
//           color: 'white', 
//           padding: '20px', 
//           borderRadius: '10px',
//           textAlign: 'center'
//         }}>
//           <h3 style={{ margin: '0 0 10px 0' }}>Real-time Analytics</h3>
//           <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>
//             Interactive dashboard with live data updates
//           </p>
//         </div>
//       </RightPanel>
//     </DashboardContainer>
//   );
// };

// export default EnhancedCalendarPieChart;
