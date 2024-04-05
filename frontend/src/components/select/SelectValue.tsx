import { Select } from "antd";
import React from "react";
import { Priority } from "../../enums/Priority";
import { Status } from "../../enums/Status";

interface SelectProps {
  field: string;
  placeholder: string;
  valueSelect: string;
  handleChange: (field: string, value: string) => void;
}
const SelectValue: React.FC<SelectProps> = ({
  handleChange,
  field,
  placeholder,
  valueSelect,
}) => {
   
  return (
    <Select
      placeholder={placeholder}
      style={{ width: "100%", marginBottom: '10px' }}
      value={valueSelect}
      onChange={(value) => handleChange(field, value)}
    >
      {Object.values(field === "priority" ? Priority : Status).map(
        (priority) => (
          <Select.Option key={priority} value={priority}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </Select.Option>
        )
      )}
    </Select>
  );
};

export default SelectValue;
