import React from "react";

type ContractHandleProps = {
  columns: {
    id: string;
    label: string;
    type: string;
    format?: (value: string | number) => string;
  }[],
  items:{
    message: string,
    handleSubmit: (e: React.FormEvent<HTMLFormElement>)=> void,
    handleDelete: ()=> void,
    setMessage: React.Dispatch<React.SetStateAction<string>> ,
    data: ContractHandleProps,
    id: string,
    type: "edit" | 'add',
  }
};

export default function ContractHandle({columns,items}: ContractHandleProps) {
  return <div>ContractHandle</div>;
}
