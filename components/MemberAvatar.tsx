import { View, Text, Image } from "react-native";
import React from "react";
import { Member } from "@/types/type";

type Props = {
  member: Member;
};

const MemberAvatar = ({ member }: Props) => {
  const hasAvatar = !!member.avatar;
  const initials = member.username
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <View className="items-center w-20">
      {hasAvatar ? (
        <Image
          source={{ uri: member.avatar }}
          className="w-12 h-12 rounded-full"
        />
      ) : (
        <View className="w-12 h-12 rounded-full bg-gray-700 items-center justify-center">
          <Text className="text-white text-sm font-bold">{initials}</Text>
        </View>
      )}
      <Text
        className="text-xs text-black mt-1 text-center"
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {member.username}
      </Text>
    </View>
  );
};

export default MemberAvatar;
