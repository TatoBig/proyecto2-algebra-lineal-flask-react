import copy

def increase_matrix(matrixb):
    new_matrix1 = matrixb
    for i in range(0, 4):
        for j in range(0, 3):
            new_matrix1[i].append(matrixb[i][j])
    return new_matrix1
    
def deta(deta1,deta2,deta3):
    return deta1+deta2+deta3

#REEMPLAZAR COLUMNAS
def replace_columns(matrix,new_column,column):
    new_matrix = 0
    new_matrix = matrix
    for i in range(0, 4):
        for j in range(0, 4):
            if j == column:
                new_matrix[i][j] = new_column[i]
    return new_matrix


#DETERMINANTE A1
def deta1(matrix):
   
    matrixa1 = increase_matrix(matrix) 
    new_matrix = matrixa1
    result1 = 0
    diagonal_up1 = 0
    for i in range(0, 4):
        diagonal_up1 = 0;
        
        if i == 3 or i == 1:
            diagonal_up1 = 1
            for j in range(0, 4):
                #print(diagonal_up)
                diagonal_up1 = new_matrix[j][j+i] * diagonal_up1
            diagonal_up1 = diagonal_up1 * -1
            result1 = result1 + diagonal_up1
            
        else:
            diagonal_up1 = 1
            for j in range(0, 4):
                diagonal_up1 = new_matrix[j][j+i] * diagonal_up1
            result1 = result1 + diagonal_up1   
    result1 = result1
    
    result21 = 0
    diagonal_down1 = 0
    for i in range(0, 4):
        diagonal_up1 = 0;    
        if i == 3 or i == 1:
            diagonal_down1 = 1
            for j in range(0, 4):
                diagonal_down1 = new_matrix[3-j][j+i] * diagonal_down1  
            diagonal_down1 = diagonal_down1 * -1
            result21 = diagonal_down1 + result21
                   
        else:
            diagonal_down1 = 1
            for j in range(0, 4):
                diagonal_down1 = new_matrix[3-j][j+i] * diagonal_down1  
            diagonal_down1 = diagonal_down1
            result21 = diagonal_down1 + result21
    result1 = result1 + result21
        

    return result1


#DETERMINANTE A2
def deta2(matrix):
    #cambiar la columna 2 con la 3 y la 3 con la 2

    temporal_first_row = [
        matrix[0][1],
        matrix[1][1],
        matrix[2][1],
        matrix[3][1],
    ]
    temporal_second_row = [
        matrix[0][2],
        matrix[1][2],
        matrix[2][2],
        matrix[3][2],
    ]
    temp_matrix = replace_columns(matrix,temporal_first_row,2)
    temp_matrix1 = replace_columns(temp_matrix,temporal_second_row,1)
    matrixa2 = increase_matrix(temp_matrix1)
    new_matrix = matrixa2
    result = 0
    diagonal_up = 0
    for i in range(0, 4):
        diagonal_up = 0;
        
        if i == 3 or i == 1:
            diagonal_up = 1
            for j in range(0, 4):
                #print(diagonal_up)
                diagonal_up = new_matrix[j][j+i] * diagonal_up
            diagonal_up = diagonal_up * 1
            result = result + diagonal_up
            
        else:
            diagonal_up = 1
            for j in range(0, 4):
                diagonal_up = new_matrix[j][j+i] * diagonal_up
            diagonal_up = diagonal_up * -1
            result = result + diagonal_up 
      
    result = result
    
    result2 = 0
    diagonal_down = 0
    for i in range(0, 4):
        diagonal_up = 0;    
        if i == 3 or i == 1:
            diagonal_down = 1
            for j in range(0, 4):
                diagonal_down = new_matrix[3-j][j+i] * diagonal_down  
            result2 = diagonal_down + result2
                   
        else:
            diagonal_down = 1
            for j in range(0, 4):
                diagonal_down = new_matrix[3-j][j+i] * diagonal_down  
            diagonal_down = diagonal_down * -1
            result2 = diagonal_down + result2
   
    result = result + result2
    new_matrix = 0
    matrix = 0
    return result
    # 


#DETERMINANTE A3
def deta3(matrix):
 
    temporal_first_row_for_matrix2 = [
        matrix[0][1],
        matrix[1][1],
        matrix[2][1],
        matrix[3][1],
    ]
    temporal_second_row_for_matrix2 = [
        matrix[0][2],
        matrix[1][2],
        matrix[2][2],
        matrix[3][2],
    ]
   
    temp_matrix = replace_columns(matrix,temporal_first_row_for_matrix2,2)
    temp_matrix = replace_columns(temp_matrix,temporal_second_row_for_matrix2,1)
    temporal_row_3=[
        temp_matrix[0][2],
        temp_matrix[1][2],
        temp_matrix[2][2],
        temp_matrix[3][2],
    ]
    temporal_row_4=[
        temp_matrix[0][3],
        temp_matrix[1][3],
        temp_matrix[2][3],
        temp_matrix[3][3], 
    ]
    
    temp_matrix = replace_columns(temp_matrix,temporal_row_3,3)
    temp_matrix = replace_columns(temp_matrix,temporal_row_4,2)
 
    matrixa3 = increase_matrix(temp_matrix)
    new_matrix = matrixa3
    
    result = 0
    diagonal_up = 0
    for i in range(0, 4):
        diagonal_up = 0;
        if i == 3 or i == 1:
            diagonal_up = 1
            for j in range(0, 4):
                #print(diagonal_up)
                diagonal_up = new_matrix[j][j+i] * diagonal_up
            diagonal_up = diagonal_up * -1
            result = result + diagonal_up
           
        else:
            diagonal_up = 1
            for j in range(0, 4):
                diagonal_up = new_matrix[j][j+i] * diagonal_up
            
            result = result + diagonal_up
            
    result = result
    
    result2 = 0
    diagonal_down = 0
    for i in range(0, 4):
        diagonal_up = 0;    
        if i == 3 or i == 1:
            diagonal_down = 1
            for j in range(0, 4):
                diagonal_down = new_matrix[3-j][j+i] * diagonal_down  
            diagonal_down = diagonal_down * -1
         
            result2 = diagonal_down + result2
                   
        else:
            diagonal_down = 1
            for j in range(0, 4):
                diagonal_down = new_matrix[3-j][j+i] * diagonal_down  
            diagonal_down = diagonal_down
            
            result2 = diagonal_down + result2
    result = result + result2
    return result

def getDeterminant(matrix):
    matrix1 = copy.deepcopy(matrix)
    matrix2 = copy.deepcopy(matrix)
    matrix3 = copy.deepcopy(matrix)

    return deta1(matrix1)+deta2(matrix2)+deta3(matrix3)