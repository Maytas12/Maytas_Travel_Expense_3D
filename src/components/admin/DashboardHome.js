import React, { useState } from 'react';
import styled from 'styled-components';
import { FaDesktop, FaCalendarAlt, FaUsers, FaEnvelope, FaChartLine, FaChartBar, FaCalendar } from 'react-icons/fa';

const DashboardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 15px;
  height: 80px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
`;

const ChartTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #333;
  font-size: 1.2rem;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  margin: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CalendarContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
`;

const CalendarHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
`;

const MonthYearDisplay = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  flex: 1;
`;

const NavigationButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const NavButton = styled.button`
  background: #667eea;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background: #764ba2;
  }
`;

const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-top: 15px;
`;

const CalendarHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #666;
`;

const CalendarDay = styled.div`
  padding: 10px;
  text-align: center;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  &.today {
    background-color: #667eea;
    color: white;
  }

  &.has-event {
    background-color: #ffd700;
    color: #333;
  }
`;

const GraphContainer = styled.div`
  background: white;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
`;

const BarChart = styled.div`
  display: flex;
  align-items: end;
  gap: 10px;
  height: 200px;
  padding: 20px 0;
`;

const Bar = styled.div`
  flex: 1;
  background: linear-gradient(to top, #667eea, #764ba2);
  border-radius: 5px 5px 0 0;
  position: relative;
  transition: height 0.3s ease;

  &::after {
    content: '${props => props.value}%';
    position: absolute;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.8rem;
    color: #666;
  }
`;

const LineChart = styled.div`
  position: relative;
  height: 200px;
  padding: 20px 0;
`;

const Line = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(to right, #667eea, #764ba2);
`;

const IconContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 12px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 0.8rem;
  color: #666;
`;

const Value = styled.p`
  margin: 3px 0 0 0;
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
`;

const DashboardHome = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const getMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const getCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    // Get first day of the month (0 = Sunday, 1 = Monday, etc.)
    const firstDay = new Date(year, month, 1).getDay();
    
    // Get last day of the month (28, 29, 30, or 31)
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    // Get today's date for comparison
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    const todayYear = today.getFullYear();
    
    const days = [];
    
    // Add empty cells for days before the first of the month
    for (let i = 0; i < firstDay; i++) {
      days.push({
        day: null,
        isToday: false,
        hasEvent: false,
        isCurrentMonth: false
      });
    }
    
    // Add days of the current month
    for (let day = 1; day <= lastDay; day++) {
      const isToday = day === todayDate && 
                     month === todayMonth && 
                     year === todayYear;
      
      days.push({
        day,
        isToday,
        hasEvent: [0].includes(day),
        isCurrentMonth: true
      });
    }
    
    // Add empty cells to fill the remaining grid (6 weeks = 42 cells)
    const totalCells = 42;
    while (days.length < totalCells) {
      days.push({
        day: null,
        isToday: false,
        hasEvent: false,
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const barData = [65, 45, 80, 55, 70, 90, 60];
  const lineData = [30, 45, 35, 50, 40, 60, 55, 70, 65, 80];

  return (
    <div>
      {/* Stats Cards */}
      <DashboardContainer>
        <StatCard>
          <IconContainer>
            <FaEnvelope />
          </IconContainer>
          <Content>
            <Title>Total Contacts</Title>
            <Value>45 Contacts</Value>
          </Content>
        </StatCard>
        <StatCard>
          <IconContainer>
            <FaCalendarAlt />
          </IconContainer>
          <Content>
            <Title>Total Carrers Applications</Title>
            <Value>12 Applications</Value>
          </Content>
        </StatCard>

        <StatCard>
          <IconContainer>
            <FaUsers />
          </IconContainer>
          <Content>
            <Title>Total Users</Title>
            <Value>1,234</Value>
          </Content>
        </StatCard>

       
      </DashboardContainer>

      {/* Charts Section */}
      <ChartGrid>
        <ChartContainer>
          <ChartTitle>
            <FaChartBar style={{ marginRight: '10px' }} />
            Weekly Activity
          </ChartTitle>
          <div>
            <BarChart>
              {barData.map((value, index) => (
                <Bar key={index} style={{ height: `${value}%` }} value={value} />
              ))}
            </BarChart>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '0.8rem', color: '#666' }}>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
          </div>
        </ChartContainer>

        <ChartContainer>
          <ChartTitle>
            <FaChartLine style={{ marginRight: '10px' }} />
            Monthly Trends
          </ChartTitle>
          <LineChart>
            <Line />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              {lineData.map((value, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>{value}</div>
                </div>
              ))}
            </div>
          </LineChart>
        </ChartContainer>
      </ChartGrid>

      {/* Calendar and Pie Chart Section */}
      <div style={{ display: 'flex', gap: '20px', margin: '20px' }}>
        <div style={{ flex: '1 1 50%' }}>
          <CalendarContainer style={{ margin: 0 }}>
            <CalendarHeaderContainer>
              <NavigationButtons>
                <NavButton onClick={() => navigateMonth(-1)}>←</NavButton>
              </NavigationButtons>
              <MonthYearDisplay>
                {getMonthYear(currentDate)}
              </MonthYearDisplay>
              <NavigationButtons>
                <NavButton onClick={() => navigateMonth(1)}>→</NavButton>
              </NavigationButtons>
            </CalendarHeaderContainer>
            <CalendarHeader>
              {weekDays.map(day => (
                <div key={day}>{day}</div>
              ))}
            </CalendarHeader>
            <CalendarGrid>
              {getCalendarDays().map(({ day, isToday, hasEvent }) => (
                <CalendarDay
                  key={day || `empty-${Math.random()}`}
                  className={`${isToday ? 'today' : ''} ${hasEvent ? 'has-event' : ''} ${day ? '' : 'empty'}`}
                  onClick={() => day && setSelectedDate(day)}
                  style={{ cursor: day ? 'pointer' : 'default', padding: '8px', fontSize: '0.9rem' }}
                >
                  {day || ''}
                </CalendarDay>
              ))}
            </CalendarGrid>
          </CalendarContainer>
        </div>
        <div style={{ flex: '1 1 50%' }}>
          <GraphContainer style={{ margin: 0 }}>
            <ChartTitle>Monthly Activity Distribution</ChartTitle>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', marginTop: '20px' }}>
              <div style={{ position: 'relative', width: '300px', height: '300px', borderRadius: '50%', background: 'conic-gradient(#667eea 0deg 216deg, #764ba2 216deg 288deg, #ffd700 288deg 360deg)' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                  {/* <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>Activity</div> */}
                </div>
              </div>
              <div style={{ marginLeft: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#667eea', marginRight: '8px' }}></div>
                  <span style={{ fontSize: '0.8rem' }}>System (60%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#764ba2', marginRight: '8px' }}></div>
                  <span style={{ fontSize: '0.8rem' }}>User (20%)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '12px', height: '12px', backgroundColor: '#ffd700', marginRight: '8px' }}></div>
                  <span style={{ fontSize: '0.8rem' }}>Other (20%)</span>
                </div>
              </div>
            </div>
          </GraphContainer>
        </div>
      </div>

      {/* Additional Graphs */}
      <GraphContainer>
        <ChartTitle>Performance Overview</ChartTitle>
        <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', color: '#667eea', fontWeight: 'bold' }}>92%</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>System Uptime</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', color: '#764ba2', fontWeight: 'bold' }}>4.8/5</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>User Rating</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', color: '#667eea', fontWeight: 'bold' }}>156</div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Active Sessions</div>
          </div>
        </div>
      </GraphContainer>
    </div>
  );
};

export default DashboardHome;
