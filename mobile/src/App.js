import React, { useState, useEffect } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from "./services/api";

import Card from "./components/Card";

export default function App() {
  const addRepositoryHandle = async () => {
    const result = await api.post("repositories", {
      title: `Repositorio ${Date.now()}`,
      techs: ["NodeJS", "React", "React DOM"],
    });

    if (result.status !== 201) {
      return;
    }

    const newRepo = result.data;

    setRepositories([...repositories, newRepo]);
  };

  async function handleLikeRepository(id) {
    // Implement "Like Repository" functionality
    const result = await api.post(`repositories/${id}/like`);

    if (result.status !== 200) {
      return;
    }

    const updatedRepo = result.data;
    const repoIndex = repositories.findIndex(
      (repo) => repo.id === updatedRepo.id
    );

    const newRepositories = [...repositories];

    newRepositories[repoIndex] = updatedRepo;

    setRepositories([...newRepositories]);
  }

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositories}
          keyExtractor={(repo) => repo.id}
          renderItem={({ item: repo }) => (
            <Card
              repository={repo}
              onAddLike={() => handleLikeRepository(repo.id)}
            />
          )}
        />
        <View>
          <TouchableOpacity
            style={styles.AddButton}
            onPress={() => addRepositoryHandle()}
          >
            <Text style={styles.buttonText}>Incluir Repositório</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  AddButton: {
    backgroundColor: "#f7f7f7",
    height: 50,
    margin: 30,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
