import React from "react";
import QRCode from 'qrcode.react';
import "styles/components/qrc.css";

const QRC = ({ uri }: { uri: string }) => {
	return (
		<div className={"qr-container"}>
			<QRCode className="qr-code" value={uri} size={256} />
		</div>       
	);
};

export default QRC;
