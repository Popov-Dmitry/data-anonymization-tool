package ru.anontmization.dataanonymizationtool.Methods.options.type;

import lombok.Data;
import lombok.NoArgsConstructor;
import ru.anontmization.dataanonymizationtool.Methods.options.MaskItem;
import ru.anontmization.dataanonymizationtool.services.ControllerDataBaseService;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Data
@NoArgsConstructor
public class ValueReplacementFromFile implements MaskItem {
    private String nameTable;
    private String nameColumn;
    private String nameFile;

    @Override
    public String getTable() {
        return nameTable;
    }

    @Override
    public List<String> getColum() {
        return List.of(nameColumn);
    }

    @Override
    public void start(ControllerDataBaseService controllerDB) throws SQLException {
        ArrayList<String> list = new ArrayList<>();
        File file = new File(nameFile);


        FileReader fr ;
        BufferedReader reader;
        try {
            fr = new FileReader(file);
            reader = new BufferedReader(fr);
            String line = reader.readLine();
            while (line != null) {
                list.add(line);
                line = reader.readLine();
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }


        controllerDB.getStatement().execute(
                "ALTER TABLE "+nameTable+" ADD COLUMN masking_method_temp_id INT GENERATED BY DEFAULT AS IDENTITY UNIQUE;"
        );

        ResultSet resultSet = controllerDB.getStatement().executeQuery(
                "SELECT "+nameColumn+", masking_method_temp_id " +
                        "FROM "+nameTable+";"
        );
        Random random = new Random();
        int cur;
        while(resultSet.next()){
            cur = random.nextInt(list.size());
            resultSet.updateObject(1, list.get(cur));
            resultSet.updateRow();
        }
        controllerDB.getStatement().execute(
                "ALTER TABLE "+nameTable+" DROP COLUMN masking_method_temp_id;"
        );
    }
}
