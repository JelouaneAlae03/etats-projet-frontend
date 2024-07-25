import { useSelector } from "react-redux"
import OptionAffichage from "../OptionAffichage/OptionAffichage";

export default function Reservation({handleFieldChange}){
    const selectedFields = useSelector((state)=> state.selectedFields);
    const filteredData = useSelector((state) => state.filteredData);

    return(
        <>
            <thead>
                <tr>
                    {selectedFields.Bien && <th>Bien</th>}
                    {selectedFields.Nature && <th>Nature</th>}
                    {selectedFields.Etage && <th>Etage</th>}
                    {selectedFields.Standing && <th>Standing</th>}
                    {selectedFields.Client && <th>Client</th>}
                    {selectedFields.Dossier && <th>Dossier</th>}
                    {selectedFields["Date de Réservation"] && <th>Dt.Résa</th>}
                    {selectedFields["Date de Conc"] && <th>Dt.Conc</th>}
                    {selectedFields["Date du Vente"] && <th>Vente</th>}
                    {selectedFields["Prix de Vente"] && <th>Prix de vente</th>}
                    {selectedFields.Encaiss && <th>Encaiss</th>}
                    {selectedFields.Reliquat && <th>Reliquat</th>}
                    {selectedFields.Commercial && <th>Commercial</th>}
                    <th className="three-points"><OptionAffichage handleFieldChange={handleFieldChange} /></th>
                </tr>
            </thead>
            <tbody>
                {filteredData.map((data, index) => (
                    <tr key={index}>
                        {selectedFields.Bien && <td>{data.Bien}</td>}
                        {selectedFields.Nature && <td>{data.Nature}</td>}
                        {selectedFields.Etage && <td>{data.Etage}</td>}
                        {selectedFields.Standing && <td>{data.Standing}</td>}
                        {selectedFields.Client && <td>{data.client}</td>}
                        {selectedFields.Dossier && <td>{data.num_dossier}</td>}
                        {selectedFields["Date de Réservation"] && <td>{data.date_reservation}</td>}
                        {selectedFields["Date de Conc"] && <td>{data.Date_concretisation}</td>}
                        {selectedFields["Date du Vente"] && <td>{data.Date_Validation}</td>}
                        {selectedFields["Prix de Vente"] && <td>{data.Prix_Vente}</td>}
                        {selectedFields.Encaiss && <td>{data.total}</td>}
                        {selectedFields.Reliquat && <td>{data.Reliquat}</td>}
                        {selectedFields.Commercial && <td>{data.Commercial}</td>}
                        <td></td>
                    </tr>
                    )
                )}
            </tbody>
        </>
    )
}