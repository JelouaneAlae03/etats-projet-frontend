import { useSelector } from "react-redux"
import OptionAffichage from "../OptionAffichage/OptionAffichage";

export default function Stock({handleFieldChange}){
    const selectedFields = useSelector((state)=> state.selectedFields);
    const filteredData = useSelector((state) => state.filteredData);

    return(
        <>
            <thead>
                <tr>
                    {selectedFields.Bien && <th>Bien</th>}
                    {selectedFields.Etage && <th>Etage</th>}
                    {selectedFields.Nature && <th>Nature</th>}
                    {selectedFields.Status && <th>Status</th>}
                    {selectedFields.Surface && <th>Surface</th>}
                    {selectedFields.Standing && <th>Standing</th>}
                    {selectedFields["N° TF"] && <th>N° TF</th>}
                    {selectedFields["Prix de Vente"] && <th>Prix de vente</th>}
                    <th className="three-points"><OptionAffichage handleFieldChange={handleFieldChange} /></th>
                </tr>
            </thead>
            <tbody>
                {filteredData.map((data, index) => (
                    <tr key={index}>
                        {selectedFields.Bien && <td>{data.Bien}</td>}
                        {selectedFields.Etage && <td>{data.Etage}</td>}
                        {selectedFields.Nature && <td>{data.Nature}</td>}
                        {selectedFields.Status && <td>{data.etat}</td>}
                        {selectedFields.Surface && <td>-</td>}
                        {selectedFields.Standing && <td>{data.Standing}</td>}
                        {selectedFields["N° TF"] && <td>-</td>}
                        {selectedFields["Prix de Vente"] && <td>{data.prix_vente}</td>}
                        <td></td>
                    </tr>
                    )
                )}
            </tbody>
        </>
    )
}