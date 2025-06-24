import { SearchBarProps } from "@/types/type";
import { View, TextInput, TextInputProps } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const SearchBar = ({
  placeholder,
  value,
  onChangeText,
  className = "",
  ...rest
}: SearchBarProps) => {
  return (
    <View
      className={`w-full h-14 bg-gray-100 rounded-xl flex-row items-center px-4 ${className}`}
    >
      <Icon name="search" size={20} color="#888" />
      <TextInput
        className="ml-3 font-JakartaMedium text-md text-black flex-1"
        placeholder={placeholder}
        placeholderTextColor="#888"
        value={value}
        onChangeText={onChangeText}
        style={{
          paddingVertical: 0,
          textAlignVertical: "center",
          lineHeight: 24,
        }}
        maxLength={35}
        numberOfLines={1}
        {...rest}
      />
    </View>
  );
};

export default SearchBar;
