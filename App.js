import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';

import { Ionicons } from "@expo/vector-icons";
import Colors from './constants/Colors';
import React,{ useEffect, useState } from 'react';
import { CheckBox, Header } from 'react-native-elements';

export default function App() {

    const [todos, setTodos] = useState([
      {id:1,task:"premiere tache", completed:true, onEdit: false},
      {id:2,task:"deuxieme tache", completed:false, onEdit: false},
    ])

    const [userInput, setUserInput] = useState("")
    const [taskCount, setTaskCount] = useState(0)
    const [taskCompleted, setTaskCompleted] = useState(0)
    const [editTask, setEditTask] = useState("")
    const [getTask, setGetTask] = useState("")


    const {container, 
          footer,
          textInput,
          icon,
          listItem,
          //actionIcon,
          btn,
          inputEditing
        } = styles

    const addTodo = () =>{
      if (userInput=='') {
        Alert.alert('Erreur', 'Veuillez saisir une tache')
      } else {
        const newTodo =  {
          id: Math.random(),
          task: userInput,
          completed: false,
        }
        setTodos([...todos, newTodo])
        //tasksCount()
        setUserInput('')
      }
    }
    const removeTodo = (todoId) =>{
      const newTodos = todos.filter(item => item.id != todoId  )
      setTodos(newTodos)
    }
    const removeTodos = () =>{
      Alert.alert('Confirmation','Voulez vous supprimer toutes les taches ?',
      [
        {
          text: 'Oui',
          onPress: () => setTodos([])
        },
        {
          text:'Non',
        }
      ])
    }
    const completeTodo = (todoId) =>{

      const newTodos = todos.map(item =>{

        if (item.id == todoId) {
          if (item.completed == false) {
            return {...item, completed: true} 
          } else {
            return {...item, completed: false}
          }
        }
        return item
      })
      setTodos(newTodos)

      countTasksCompleted(newTodos);
    }
    const editTodo = (todoId) =>{
      
      const newTodos = todos.map(item =>{

        if (item.id == todoId) {
            return {...item, task: editTask, onEdit:false}
        }
        return item
      })
      setTodos(newTodos)
    }
    const HandleEditTask = (todoId) =>{

      const newTodos = todos.map(item =>{

        if (item.id == todoId) {
            setGetTask(item.task)
            return {...item, onEdit: true}
        }
        return item
      })
      setTodos(newTodos)
    }
    const countTasksCompleted = (tasks) => {
      const tasksC = tasks.filter(item => item.completed == true).length;
      setTaskCompleted(tasksC);
    }
    const tasksCount = (tasks) => {
      const tasksCount = Object.keys(tasks).length;
      setTaskCount(tasksCount);
    }
    useEffect(()=>{
      countTasksCompleted(todos)
      tasksCount(todos)
    })
  return (
    <View style={container}>
      <Header
        leftComponent={{ icon: 'menu', color: '#fff', size:40 }}
        centerComponent={{ text: 'MyTodoApp', style: { color: '#fff', fontWeight:'bold', fontSize:25 } }}
        rightComponent={{ icon: 'delete', color: '#fff', size:40, onPress: removeTodos }}
        backgroundColor={Colors.purple}
      />
      <View style={{marginBottom:10, marginTop:20}}>
        <Text style={{fontSize:30,fontWeight:'bold'}}>{ taskCount>0? taskCompleted+'/'+taskCount+' Termine(s)': '0 Tache' } </Text>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        {
          todos.map(item =>(
            <View key={item.id} style={listItem}>
              <View>
                {
                  !item.onEdit? (
                    <Text                
                      style={{
                      fontWeight:'bold', fontSize:20,
                      padding:10,
                      textDecorationLine: item.completed? 'line-through':'none'
                    }}>
                      {item.task}
                    </Text>
                  ):(
                    <View style={{ flexDirection:'row', alignItems:'center'}}>
                      <TextInput
                        style={inputEditing}
                        defaultValue={getTask}
                        onChangeText={text => setEditTask(text)}
                        onEndEditing={()=>editTodo(item.id)}
                        
                        
                      />
                      {/* <TouchableOpacity onPress={()=>editTodo(item.id)}>
                        <Ionicons name='create' size={25} color={Colors.blue} />
                      </TouchableOpacity> */}
                    </View>
                  )
                }
              </View>
              <View style={btn}>
                <CheckBox size={30} style={{marginTop:10}} checkedColor={Colors.green} checked={item.completed} onPress={() => completeTodo(item.id)} >
                </CheckBox>
                <TouchableOpacity onPress={()=> HandleEditTask(item.id)}>
                  <Ionicons name='create' size={32} color={Colors.purple} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> removeTodo(item.id)}>
                  <Ionicons name='trash' size={30} color={Colors.red} />
                </TouchableOpacity>
              </View>
            </View>
          ))
        }
      </ScrollView>
      <View style={footer}>
        <View style={textInput}>
          <TextInput
            style={{fontSize:22}}
            placeholder='Ajouter une tache'
            value={userInput}
            onChangeText={text => setUserInput(text)}
          />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={icon}>
          <Ionicons name='add' size={30} color={Colors.white} />
          </View>
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
  footer:{
    position:'absolute',
    bottom:0,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
    justifyContent:'space-between'
  },
  textInput:{
    elevation:40,
    flex:1,
    height:60,
    marginVertical:20,
    marginRight:20,
    borderRadius:30,
    paddingHorizontal:20,
    backgroundColor: Colors.white,
    justifyContent:'center'
  },
  icon:{
    height:60,
    width:60,
    backgroundColor: Colors.purple,
    borderRadius:30,
    elevation:40,
    justifyContent: 'center',
    alignItems:'center',
  },
  listItem:{
    marginVertical:10,
    elevation:7,
    height:80,
    width:340,
    borderRadius:10,
    alignItems:'center',
    flexDirection:'row',
    justifyContent: 'space-around'
  },
  actionIcon:{
    height:25,
    width:25,
    backgroundColor:Colors.green,
    justifyContent:'center',
    alignItems:'center',
    marginLeft:5,
    borderRadius:5,
  },
  btn:{
    justifyContent:'space-around',
    flexDirection:'row',
    alignItems:'center',
    paddingRight:10
  },
  inputEditing:{
    fontSize:22, 
    maxWidth: 170, 
    minWidth: 170,
    borderRadius:10,
    borderColor: Colors.black,
    height:50,
    paddingLeft:10,
    elevation:3,
    margin:10
  }
});
