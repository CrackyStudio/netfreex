import React, { useEffect } from "react";
import { TextInput } from "evergreen-ui";
import { useStateValue } from "hooks/provider";
import "styles/components/CodeInput.css";

const CodeInput = () => {
    const [{ passcode, codeFilled }, dispatch] = useStateValue() as Array<any>;

	useEffect(() => {
		dispatch({ key: "passcode", value: "" });
		dispatch({ key: "codeFilled", value: "unfilled" });
	}, [dispatch]);
	
    const setPasscode = (e: any) => {
		dispatch({ key: "passcode", value: e.target.value });
		if (passcode !== undefined && passcode.length >= 5) {
			dispatch({ key: "codeFilled", value: "filled" });
		} else {
			dispatch({ key: "codeFilled", value: "unfilled" });
		}		
	};

	const resetPasscode = () => {
		dispatch({ key: "passcode", value: "" });
		dispatch({ key: "codeFilled", value: "unfilled" });	
    };
    
	return (
		<TextInput className={`login-input code ${codeFilled}`} maxLength="6" value={passcode} onChange={(e: any) => setPasscode(e)} onClick={() => resetPasscode()} />       
	);
};

export default CodeInput;
