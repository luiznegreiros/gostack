import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const Card = ({ repository, onAddLike }) => {
  const { id: repositoryID, title, techs, likes } = repository;
  const printLikes = (qty) => {
    if (qty === 0) {
      return "Nenhuma curtida 😞";
    }

    if (qty === 1) {
      return "1 curtida 😋";
    }

    return `${qty} curtidas ${qty < 20 ? "😃" : "🤩🥳🤪"}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.techsContainer}>
        {techs.map((tech) => (
          <Text key={tech} style={styles.tech}>
            {tech}
          </Text>
        ))}
      </View>
      <View style={styles.likesContainer}>
        <Text
          style={styles.likeText}
          // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
          testID={`repository-likes-${repositoryID}`}
        >
          {printLikes(likes)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={onAddLike}
        // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
        testID={`like-button-${repositoryID}`}
      >
        <Text style={styles.buttonText}>Curtir</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});

export default Card;
