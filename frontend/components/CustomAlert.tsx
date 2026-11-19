import { useState } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

export function CustomAlert({
  bgColor,
  title,
  border,
  color,
  visible,
  onClose,
  content,
}: {
  title?: string;
  border?: string;
  bgColor?: string;
  color?: string;
  visible: boolean;
  onClose: () => void; // Made required
  content?: React.ReactNode;
}) {
  if (!visible) return null;

  return (
    <Modal transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.alertBox, { backgroundColor: bgColor }]}>
          {title && <Text style={[styles.title, { color }]}>{title}</Text>}
          <View style={styles.message}>{content}</View>

          <View style={{ flexDirection: "row" , justifyContent: "flex-end", alignItems: "flex-end"}}>
            <TouchableOpacity style={[
                    styles.button,
                    {
                    backgroundColor: bgColor,
                    borderColor: border,
                    },
                ]} onPress={onClose}>
                <Text style={[styles.buttonText, { color }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// Keep your existing styles...

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    width: "80%",
    borderRadius: 15,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    // width: 50,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1
    // flex: 1,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginLeft: 8,
  },
});
