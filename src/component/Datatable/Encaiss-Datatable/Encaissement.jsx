import { useSelector } from "react-redux"
import OptionAffichage from "../OptionAffichage/OptionAffichage";

export default function Encaissement ({handleFieldChange}) {
    const selectedFields = useSelector((state) => state.selectedFields);
    const filteredData = useSelector((state) => state.filteredData);

    return(
        <>
            <thead>
                <tr>
                    {selectedFields.Bien && <th>Bien</th>}
                    {selectedFields.Client && <th>Nom & Prénom</th>}
                    {selectedFields["Prix de Vente"] && <th>P.Vente</th>}
                    {selectedFields.Montant && <th>Encaiss</th>}
                    {selectedFields.Reliquat && <th>Reliquat</th>}
                    {selectedFields.Pourcentage && <th>%</th>}
                    {selectedFields.Date && <th>Date</th>}
                    {selectedFields["Numero de Reçu"] && <th>Reçu</th>}
                    {selectedFields.Numero && <th>N°</th>}
                    {selectedFields.Nature && <th>Nature</th>}
                    {selectedFields["Lib de Banque"] && <th>Banque</th>}
                    {selectedFields["Lib d'Agence"] && <th>Agence</th>}
                    {selectedFields["Lib de Ville"] && <th>Ville</th>}
                    {selectedFields["Date du Création"] && <th>Création</th>}
                    <th className="three-points"><OptionAffichage handleFieldChange={handleFieldChange} /></th>
                </tr>
            </thead>
            <tbody>
                {filteredData && filteredData.map((item, index) => (
                    <tr key={index}>
                        {selectedFields.Bien && <td>{item.Bien}</td>}
                        {selectedFields.Client && <td>{item.client}</td>}
                        {selectedFields["Prix de Vente"] && <td>{item.Prix_Vente}</td>}
                        {selectedFields.Montant && <td>{item.montant}</td>}
                        {selectedFields.Reliquat && <td>{item.difference}</td>}
                        {selectedFields.Pourcentage && <td>{item.percentage}</td>}
                        {selectedFields.Date && <td>{item.date_encaissement}</td>}
                        {selectedFields["Numero de Reçu"] && <td>{item.Num_Recu}</td>}
                        {selectedFields.Numero && <td>{item.Numero}</td>}
                        {selectedFields.Nature && <td>{item.Nature}</td>}
                        {selectedFields["Lib de Banque"] && <td>{item.Lib_Banque}</td>}
                        {selectedFields["Lib d'Agence"] && <td>{item.Lib_Agence}</td>}
                        {selectedFields["Lib de Ville"] && <td>{item.Lib_Ville}</td>}
                        {selectedFields["Date du Création"] && <td>{item.Date_Systeme}</td>}
                        <td className="black-td"></td>
                    </tr>
                ))}
            </tbody>
        </>
    )
}