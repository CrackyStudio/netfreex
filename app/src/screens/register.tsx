import React, { useEffect } from "react";
import fetch from "services/fetch";
import QRC from "components/QRC";
import CodeInput from "components/CodeInput";
import { useStateValue } from "hooks/provider";
import { TextInput, Button, toaster } from "evergreen-ui";
import { authenticator } from 'otplib';
import "styles/screens/register.css";

const Register: React.FC = () => {
    const [{ pseudo, secret, qrCode, passcode }, dispatch] = useStateValue() as Array<any>;

	useEffect(() => {
        if (secret !== undefined && pseudo !== undefined) {
            const qrURI = authenticator.keyuri(pseudo, 'Netfreex', secret)
            dispatch({ key: "qrCode", value: qrURI });
        }
    }, [secret, qrCode, dispatch, pseudo]);

    const setPseudo = (e: any) => {
        dispatch({ key: "pseudo", value: e.target.value });
    };

    const createAccount = () => {
        fetch.createAccount({ nickname: pseudo }).then((response: any) => {
            if (response.errors) {
                toaster.danger("Une erreur est survenue", {
                    description: response.errors[0].message,
                    duration: 5
                });
            } else {
                dispatch({ key: "secret", value: response.Secret})
            }        
        });
    }

    const verify2FA = () => {
        fetch.validate2FA({ token: passcode, secret }).then((response: any) => {
            if (response === "2FA authorization succeded") {
                toaster.success("Création de compte complété", {
                    description: "Vous pouvez désormais vous connecter",
                    duration: 5
                });
                dispatch({ key: "secret", value: undefined});
                dispatch({ key: "register", value: false});
            } else {
                toaster.danger("L'authentification a échoué", {
                    description: "Le code saisi est incorrect ou n'est plus valide (30s)",
                    duration: 5
                });
            }
        });
    }
    
	return (
        <div className="register-container">
            {!secret && (
                <>
                    <p>C'est quoi ton pseudo ?</p>
                    <TextInput autoFocus={true} value={pseudo} margin={20} onChange={(e: any) => setPseudo(e)} />
                    <Button
						className="verify-2fa-button"
						appearance="primary"
						intent="danger"
						onClick={() => createAccount()}
					>Continuer</Button>
                </>
            )}
            {secret && qrCode === undefined && (
                <p>Chargement</p>
            )}
            {secret && qrCode !== undefined && (
                <>
                    <p>Scannez ce code avec une application 2FA</p>
                    <QRC uri={qrCode} />
                    <p>Puis entrez le code généré</p>
                    <CodeInput />
                    <Button
						className="verify-2fa-button"
						appearance="primary"
						intent="danger"
						onClick={() => verify2FA()}
					>Valider</Button>
                </>
            )}
        </div>
	);
};

export default Register;
