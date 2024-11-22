import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import OrangeButton from "../../../../components/OrangeButton";
import GreyButton from "../../../../components/GreyButton";
import TextBox from "../../../../components/TextBox";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePopUp } from "../../../_layout";
import obrasData from "../../../../data/obras.json";
import tasksData from "../../../../data/tasks.json";


const obraTarefaAdd = () => {
  const router = useRouter();

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const { id } = useLocalSearchParams();

  const [obra, setObra] = useState(null);
  const [tasks, setTasks] = useState(
    tasksData.filter((item) => item.obraId == id)
  );

  const { showPopUp } = usePopUp(); 

  const fetchObraById = (id) => {
    const foundObra = obrasData.find((item) => item.id === id);
    if (foundObra) {
      setObra(foundObra);
    } else {
      setObra(null);
    }
  };

  const fetchObraTasks = (id) => {
    const taskTmp = tasksData.filter((item) => item.obraId == id);
    if (taskTmp) {
      setTasks(taskTmp);
    } else {
      setTasks([]);
    }
  };

  useEffect(() => {
    if (id) {
      const obraId = parseInt(id, 10);
      fetchObraById(obraId);
      fetchObraTasks(obraId);
    }
  }, [id]);

  const handleConfirmButtonPress = () => {
    if (taskTitle == "" || taskDescription == "") {
      handleInvalidInput();
    }
    else{
      handleShowPopUp();
    }
  }

  const handleInvalidInput = () => {
    showPopUp({
      title: "Dados Inválidos",
      message: "Por favor preencha todos os campos.",
      primaryBtn: {
        label: "Ok",
        onPress: () => console.log("Ok button pressed"),
      },
      secondaryBtn: {
        label: "",
        onPress: () => console.log("Cancel button pressed"),
      },
    });
  };


  const handleShowPopUp = () => {
    showPopUp({
      title: "Criar Tarefa?",
      message: "Tem a certeza que deseja criar esta tarefa?",
      primaryBtn: {
        label: "Sim",
        onPress: () => handleCreateTask(),
      },
      secondaryBtn: {
        label: "Não"
      },
    });
  };

  const handleCreateTask = () => {
    const newTask = {
      id: Date.now(),
      obraId: obra.id,
      title: taskTitle,
      description: taskDescription,
      employeeId: "",
      done: false,
    };

    tasksData.push(newTask);

    router.push({
      pathname: "/Pages/Obras/Tarefas/obraTarefaAddSuccess",
      params: {
        id: newTask.id,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imagePostion}>
        <Image
          style={styles.imagestyle}
          source={require("../../../../Images/tasksIcon.png")}
        />
      </View>
      <View style={styles.headerPosition}>
        <Text style={styles.headerTitle}>Adicionar Tarefa</Text>
      </View>
      <View style={styles.headerPosition}>
        <TextBox
          label={"Título"}
          backgroundColor={"white"}
          textcolor={"black"}
          width={330}
          height={50}
          value={taskTitle}
          onChangeText={setTaskTitle}
        />

        <TextBox
          label={"Descrição"}
          backgroundColor={"white"}
          textcolor={"black"}
          width={330}
          height={50}
          value={taskDescription}
          onChangeText={setTaskDescription}
        />
      </View>

      <View style={styles.bottomButton}>
        <TouchableOpacity>
          <OrangeButton
            label={"Confirmar"}
            width={330}
            height={50}
            onPress={() => handleConfirmButtonPress()}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomButton}>
        <TouchableOpacity>
          <GreyButton
            label={"Cancelar"}
            width={330}
            height={50}
            onPress={() =>
              router.push({
                pathname: "/Pages/Obras/Tarefas/obraTarefas",
                params: {
                  id: id,
                },
              })
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
    flexDirection: "column",
  },
  imagePostion: {
    alignContent: "center",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 80,
  },
  imagestyle: {
    height: 130,
    width: 130,
    resizeMode: "contain",
  },
  headerPosition: {
    alignContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  bottomButton: {
    marginBottom: 15,
  },
});

export default obraTarefaAdd;
