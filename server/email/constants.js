export const accountConfirmationHtml =
`<table width="650" height="auto" border="0" cellspacing="0" cellpadding="0" align="center">
<tbody>
<tr>
<td width="650" height="20">&nbsp;</td>
</tr>
<tr>
<td width="650" height="auto" bgcolor="#ffffff">
<table width="100%" height="auto" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td width="650" height="20">&nbsp;</td>
</tr>
<tr>
<td width="650" height="auto">
<table width="650" height="auto" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td width="20" height="auto">&nbsp;</td>
<td width="610" height="auto">
<table width="100%" height="auto" border="0" cellspacing="0" cellpadding="0">
<tbody>
<tr>
<td width="610" height="auto" align="center" style="font-family:Arial,Helvetica,sans-serif; font-size:18px; color:#dd291a">
Dernière étape pour la création de votre compte <br/>
<br/>
</td>
</tr>
<tr>
</tr>
<tr>
</tr>
<tr>
<td width="610" height="auto" align="left" style="font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#353535">
<br/>
Bonjour,<br/>
Afin de finaliser la création de votre compte nous vous invitons à cliquer sur le lien ci-dessous :<br/>
<br/>

<table border="0" cellspacing="0" cellpadding="0" align="center">
<tbody>
<tr>
<td width="20" align="right"><div style="border-radius: 5px 0 0 4px; background-color: #3baeda;width:5px;height:30px"></div></td>
<td nowrap="" bgcolor="#3baeda">
<font style="font:12px Arial,Helvetica,sans-serif; text-transform:uppercase; color:#ffffff">
<a href="\${URL}" target="_blank" style="color:#ffffff; text-decoration:none">J'active mon compte</a></font></td>
<td width="20" align="left"><div style="border-radius: 0 5px 5px 0; background-color: #3baeda;width:5px;height:30px"></div></td>
</tr>
</tbody>
</table>
<br/>
<br/>
Vous serez redirigé automatiquement vers votre espace personnel du site Accompagner l'autisme.<br/>
</td>
</tr>
</tbody>
</table>
</td>
<td width="20" height="auto">&nbsp;</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td width="650" height="20">&nbsp;</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr>
<td width="650" height="20">&nbsp;</td>
</tr>
</tbody>
</table>`;

export const accountConfirmationText = 'Bonjour, afin de finaliser la création de votre compte sur le site Accompagner l\'autisme, nous vous invitons à copier le lien suivant dans un navigateur internet : ${URL}';

export default { accountConfirmationHtml, accountConfirmationText };