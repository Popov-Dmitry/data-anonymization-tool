package ru.anontmization.dataanonymizationtool.Methods.options.type;

import lombok.Data;
import lombok.NoArgsConstructor;
import ru.anontmization.dataanonymizationtool.Methods.options.MaskItem;
import ru.anontmization.dataanonymizationtool.services.ControllerDataBaseService;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Arrays;

@Data
@NoArgsConstructor
public class Identifier implements MaskItem {
    private String nameTable;
    private String[] namesColumn;
    private String newNameTable;

    @Override
    public String getTable() {
        return nameTable;
    }

    private String convertStringArrayToString(String[] strArr, String idTable) {
        StringBuilder sb = new StringBuilder();
        for (String str : strArr)
            sb.append(str).append(",");
        return sb.append(idTable).substring(0, sb.length());
    }

    @Override
    public void start(ControllerDataBaseService controllerDB) throws SQLException {
        String nameTempIdField = "temp_id_by_identifier";
        int length;

        controllerDB.getStatement().execute(
                "ALTER TABLE "+nameTable+" ADD COLUMN "+nameTempIdField+" INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY;"
        );

        controllerDB.getStatement().execute(
                "ALTER TABLE "+nameTable+" ADD COLUMN id_"+newNameTable+" TEXT;"
        );


        ResultSet result = controllerDB.getStatement().executeQuery(
                "select length("+namesColumn[0]+"::text) from "+nameTable+" order by length("+namesColumn[0]+"::text) desc limit 1;"
        );
        result.next();
        length = result.getInt(1);

        result = controllerDB.getStatement().executeQuery(
                "SELECT "+nameTempIdField+", id_"+newNameTable+", "+nameTempIdField+" FROM "+nameTable+";"
        );

        try{
            final MessageDigest digest = MessageDigest.getInstance("SHA3-256");
            String hashString, sha3Hex;
            byte[] hashbytes;
            while(result.next()){
                hashString = length + result.getString(1);
                hashbytes = digest.digest(
                        hashString.getBytes(StandardCharsets.UTF_8));
                sha3Hex = bytesToHex(hashbytes);
                result.updateString(2, sha3Hex);
                result.updateRow();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        String columnsRow = convertStringArrayToString(namesColumn, "id_"+newNameTable);


        controllerDB.getStatement().execute(
                "CREATE TABLE "+newNameTable+" AS (SELECT "+columnsRow+" FROM "+nameTable+");"
        );

        Arrays.stream(namesColumn).forEach(
                column-> controllerDB.statementExecute(
                        "ALTER TABLE "+nameTable+" DROP COLUMN "+column+";"
                )
        );
        controllerDB.getStatement().execute(
                "ALTER TABLE "+nameTable+" DROP COLUMN "+nameTempIdField+";"
        );
    }

    private String bytesToHex(byte[] hash) {
        StringBuilder hexString = new StringBuilder(2 * hash.length);
        for (int i = 0; i < hash.length; i++) {
            String hex = Integer.toHexString(0xff & hash[i]);
            if(hex.length() == 1) {
                hexString.append('0');
            }
            hexString.append(hex);
        }
        return hexString.toString();
    }

}
