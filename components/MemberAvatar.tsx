import { View, Text, Image } from "react-native";
import React from "react";
import { Member } from "@/types/type";

type Props = {
  member: Member;
};

const MemberAvatar = ({ member }: Props) => {
  return (
    <View className="items-center mr-3">
      {member.avatar ? (
        <Image
          source={{ uri: member.avatar }}
          className="w-10 h-10 rounded-full"
        />
      ) : (
        <View className="w-10 h-10 rounded-full bg-gray-700 items-center justify-center">
          <Text className="text-white text-sm">
            {member.username?.slice(0, 2).toUpperCase()}
          </Text>
        </View>
      )}
      <Text className="text-xs text-gray-500 mt-1">{member.username}</Text>
    </View>
  );
};

export default MemberAvatar;
