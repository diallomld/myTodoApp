import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

import { Ionicons } from "@expo/vector-icons";
import Colors from './constants/Colors';
import { useState } from 'react';
import { CheckBox } from 'react-native-elements';

export default function App() {

  const {container,
        header,
        tasks, 
        footer,
      } = styles

      const [todo, setTodo] = useState("")
      const [todos, setTodos] = useState([{id:1,task:"premiere petite tache", completed:true}, {id:2,task:"deuxieme tache", completed:false}])

      const addTodo = () =>{

      }

      const removeTodos = () =>{

      }
      const removeTodo = (id) =>{

      }

  return (
    <View style={container}>
      <View style= {header}>
        <Text style={{fontSize:25}}>MyTodoApp</Text>
        <TouchableOpacity onPress={removeTodos}>
          <Ionicons name='trash' size={22} color={Colors.red} />
        </TouchableOpacity>
      </View>
      <View>
        {
          todos.map(item =>(
            <View style={tasks}>
              <Text>{item.task}</Text>
              <CheckBox checked={item.completed} >
              </CheckBox>
              <TouchableOpacity onPress={removeTodo(item.id)}>
                <Ionicons name='trash' size={22} color={Colors.red} />
              </TouchableOpacity>
            </View>
          ))
        }
      </View>
      <View style={footer}>
        <TextInput style={{width:'100px', height:'30px'}} value={todo} onChange={e => setTodo(e.target.value) }/>
        <TouchableOpacity onPress={addTodo}>
          <Ionicons name='add' size={22} color={Colors.red} />
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header:{
    flex:1,
    alignItems:'center',
    justifyContent:'space-between',
  },
  tasks:{
    flex:1,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'space-between'
  },
  footer:{
    flex:1,
    justifyContent:'space-between'
  }
});
