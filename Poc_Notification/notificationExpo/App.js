import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

//Importar os recursos da biblioteca
import * as Notifications from "expo-notifications";
//No código acima, notifications é só um nome que eu dei para poder usar as configurações da expo-notifications

//Solicitar as permissões de notificação ao iniciar o app
Notifications.requestPermissionsAsync();

//definir como as notificações devem ser tratadas quando recebidas
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    //Mostra o alerta quando a notificação for recebida
    shouldShowAlert: true,

    //Reproduz o som ao receber a notificação
    shouldPlaySound: true,

    //configura o número de notificações do app
    shouldSetBadge: true,
  }),
});

export default function App() {

  //Função para lidar com a chamada da notificação

  const handleCallNotifications = async () => {
    //obtém os estados das permissões
    const { status } = await Notifications.getPermissionsAsync();

    //Verifica se o usuário concedeu permissão para a notificação
    if (status !== "granted") {
      alert("Você não deixou as notificações ativas");
      return;
    }

    //obter o token de envio de notificação
    const token =await Notifications.getExpoPushTokenAsync();
    console.log(token);
    
    // agendar uma notificação para ser exibida após 5 segundos 
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Hello world",
        body: "Criando uma Poc para implementar expo notifications"
      },
      trigger: {
        seconds:5
      }
    })

  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleCallNotifications}  
      >
        <Text style={styles.textButton}>Notificação</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: "80%",
    height: 80,
    backgroundColor: "green",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  textButton: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }

});
