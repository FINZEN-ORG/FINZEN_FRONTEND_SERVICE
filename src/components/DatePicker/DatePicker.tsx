import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import { datePickerStyles } from './DatePicker.styles';

export interface DatePickerProps {
  value?: string; // Fecha seleccionada en formato DD/MM/YYYY
  onDateChange: (date: string) => void;
  placeholder?: string;
  containerStyle?: any;
  inputStyle?: any;
  format?: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
}

interface CalendarDay {
  day: number;
  isCurrentMonth: boolean;
  date: Date;
  isToday: boolean;
  isSelected: boolean;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value = '',
  onDateChange,
  placeholder = 'Seleccionar fecha',
  containerStyle,
  inputStyle,
  format = 'DD/MM/YYYY',
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? parseDateString(value, format) : null
  );

  // Función para parsear string de fecha según formato
  function parseDateString(dateString: string, dateFormat: string): Date | null {
    if (!dateString) return null;
    
    const parts = dateString.split('/');
    if (parts.length !== 3) return null;

    let day, month, year;
    
    switch (dateFormat) {
      case 'DD/MM/YYYY':
        [day, month, year] = parts;
        break;
      case 'MM/DD/YYYY':
        [month, day, year] = parts;
        break;
      default:
        return null;
    }

    const parsedDate = new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10));
    return isNaN(parsedDate.getTime()) ? null : parsedDate;
  }

  // Función para formatear fecha según el formato especificado
  function formatDate(date: Date, dateFormat: string): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    switch (dateFormat) {
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      default:
        return `${day}/${month}/${year}`;
    }
  }

  // Generar días del calendario
  const generateCalendarDays = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Primer día del mes
    const firstDay = new Date(year, month, 1);
    // Último día del mes
    const lastDay = new Date(year, month + 1, 0);
    
    // Primer día de la semana del calendario (puede ser del mes anterior)
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    // Último día de la semana del calendario (puede ser del mes siguiente)
    const endDate = new Date(lastDay);
    endDate.setDate(endDate.getDate() + (6 - lastDay.getDay()));
    
    const days: CalendarDay[] = [];
    const today = new Date();
    
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dayDate = new Date(d);
      const isCurrentMonth = dayDate.getMonth() === month;
      const isToday = dayDate.toDateString() === today.toDateString();
      const isSelected = selectedDate ? dayDate.toDateString() === selectedDate.toDateString() : false;
      
      days.push({
        day: dayDate.getDate(),
        isCurrentMonth,
        date: dayDate,
        isToday,
        isSelected,
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays(currentDate);

  // Navegación del calendario
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  // Seleccionar fecha (solo fechas futuras permitidas)
  const selectDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Prevenir selección de fechas pasadas
    if (date < today) {
      return;
    }
    
    setSelectedDate(date);
    const formattedDate = formatDate(date, format);
    onDateChange(formattedDate);
    setIsModalVisible(false);
  };

  // Renderizar día del calendario
  const renderCalendarDay = ({ item }: { item: CalendarDay }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const itemDate = new Date(item.date);
    itemDate.setHours(0, 0, 0, 0);
    const isPastDate = itemDate < today;
    
    return (
      <TouchableOpacity
        style={[
          datePickerStyles.dayContainer,
          !item.isCurrentMonth && datePickerStyles.dayInactive,
          item.isToday && datePickerStyles.dayToday,
          item.isSelected && datePickerStyles.daySelected,
          isPastDate && datePickerStyles.dayDisabled,
        ]}
        onPress={() => selectDate(item.date)}
        disabled={!item.isCurrentMonth || isPastDate}
      >
        <Text
          style={[
            datePickerStyles.dayText,
            !item.isCurrentMonth && datePickerStyles.dayTextInactive,
            item.isToday && datePickerStyles.dayTextToday,
            item.isSelected && datePickerStyles.dayTextSelected,
            isPastDate && datePickerStyles.dayTextDisabled,
          ]}
        >
          {item.day}
        </Text>
      </TouchableOpacity>
    );
  };

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  return (
    <View style={[datePickerStyles.container, containerStyle]}>
      {/* Input que abre el calendario */}
      <TouchableOpacity
        style={[datePickerStyles.input, inputStyle]}
        onPress={() => setIsModalVisible(true)}
      >
        <Text style={[
          datePickerStyles.inputText,
          !value && datePickerStyles.placeholderText
        ]}>
          {value || placeholder}
        </Text>
        <Text style={datePickerStyles.calendarIcon}>📅</Text>
      </TouchableOpacity>

      {/* Modal del calendario */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={datePickerStyles.modalOverlay}>
          <View style={datePickerStyles.calendarContainer}>
            {/* Header del calendario */}
            <View style={datePickerStyles.calendarHeader}>
              <TouchableOpacity
                style={datePickerStyles.navButton}
                onPress={goToPreviousMonth}
              >
                <Text style={datePickerStyles.navButtonText}>‹</Text>
              </TouchableOpacity>
              
              <Text style={datePickerStyles.monthText}>
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </Text>
              
              <TouchableOpacity
                style={datePickerStyles.navButton}
                onPress={goToNextMonth}
              >
                <Text style={datePickerStyles.navButtonText}>›</Text>
              </TouchableOpacity>
            </View>

            {/* Nombres de los días */}
            <View style={datePickerStyles.weekHeader}>
              {dayNames.map((day) => (
                <View key={day} style={datePickerStyles.weekDayContainer}>
                  <Text style={datePickerStyles.weekDayText}>{day}</Text>
                </View>
              ))}
            </View>

            {/* Calendario */}
            <FlatList
              data={calendarDays}
              renderItem={renderCalendarDay}
              keyExtractor={(item, index) => index.toString()}
              numColumns={7}
              style={datePickerStyles.calendar}
              showsVerticalScrollIndicator={false}
            />

            {/* Botones de acción */}
            <View style={datePickerStyles.actionButtons}>
              <TouchableOpacity
                style={datePickerStyles.cancelButton}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={datePickerStyles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={datePickerStyles.todayButton}
                onPress={() => {
                  const today = new Date();
                  selectDate(today);
                }}
              >
                <Text style={datePickerStyles.todayButtonText}>Hoy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DatePicker;