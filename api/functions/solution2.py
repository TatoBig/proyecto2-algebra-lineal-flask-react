import numpy as np
import copy
import sys

def ejemp():
    for i in range(0,5):
        print(i)
    return ""
#RECUERDA PONER LOS 3 COMO 4
def replace_row(matrix,new_row,row):
    new_matrix = matrix
    for i in range(0 , 3):
        new_matrix[row][i] = new_row[i]
    return new_matrix

def basic_operate_rows(line1,line2,add):
    new_line = [0,0,0]
    if add == 1:
        for i in range(0 , 3):
            new_line[i] = (line1[i]*1)+line2[i]
    elif add == -1:
        for i in range(0 , 3):
            new_line[i] = (line1[i])+(line2[i]*-1)
    return new_line

def round_terms(matrix):
    new_matrix = matrix
    for row in range(0 , 3):
        for column in range(0 , 3):
            new_matrix[row][column] = round(matrix[row][column],2)
    return new_matrix

def multiply_rows(line,escalar):
    new_line = [0,0,0]
    for i in range(0 , 3):
        new_line[i] = line[i]*escalar
    return new_line
#+++++++++++++++++++NO ESTOY SEGURO DE USARLO
def watch_zeroz_in_a_column(matrix,column):
    done = false
    top = 4 - column 
    counter = 0
    for i in range(column + 1 , top):
        if(matrix[i][column] == 0):
            counter += 1
    if(column == 0):
        if(counter == 2):
            done = true
    elif(column == 1):
        if counter == 1:
            done = true
    elif(column == 2):
        done = true
    return done
#++++++++++++++ SI LLEGA UN 4 ES POR EL LA COLUMNA ESTA LIMPIA++++++++++
def zeros_finder(matrix,row):
    top = 4-row
    where = 0
    match = False
    i = row
    if row == 2:
        where = 4
    elif row == 0:
        i=row + 1
        while match == False and i < 3:
            if matrix[i][row] != 0:
                where = i
                match = True
                # print("encontrado en :"+str(i))
            i = i + 1
    elif(row == 1):
        i = row + 1
        if matrix[i][row] != 0:
                where = i
                match = True
    if match == False:
        where = 4
    return where
#encontrar el numero
def number_finder(number1,number2):
    escalar = number2/number1
    return escalar


#sacar la matriz escalonada
def escalonate_matrix(matrix):
    columns = 0
    new_matrix = matrix
    while columns < 3:
        top = 3 - columns
        #print("place before is: "+str(zeros_finder(new_matrix,columns)))
        if zeros_finder(new_matrix,columns) != 4:
            if columns != 1:
                for i in range(columns + 1, top):
                    place = zeros_finder(new_matrix,columns)
                    escalar = number_finder(new_matrix[columns][columns],new_matrix[place][columns])
                    rowtgbm = new_matrix[columns]
                    multyplied_row = multiply_rows(rowtgbm,escalar)
                    new_line = basic_operate_rows(multyplied_row,new_matrix[place],-1)
                    new_matrix = replace_row(new_matrix,new_line,place)
            else:
                place = zeros_finder(new_matrix,1)
                escalar = number_finder(new_matrix[columns][columns],new_matrix[place][columns])
                rowtgbm = new_matrix[columns]
                multyplied_row = multiply_rows(rowtgbm,escalar)
                new_line = basic_operate_rows(multyplied_row,new_matrix[place],-1)
                new_matrix = replace_row(new_matrix,new_line,place)
        columns = columns + 1
    
    return new_matrix  
#+++++++++++++++++++++++++++++++++AREA PARA SACAR LOS VECTORES
def replace_columns(matrix,new_column,column):
    new_matrix = 0
    new_matrix = matrix
    for i in range(0, 4):
        for j in range(0, 4):
            if j == column:
                new_matrix[i][j] = new_column[i]
    return new_matrix
#RANGO DE A
def rangeA(matrix):
    counter = 0
    new_matrix = round_terms(escalonate_matrix(matrix))
    if new_matrix[0][0] != 0:
        counter = counter + 1
    if new_matrix[1][1] != 0:
        counter = counter + 1
    if new_matrix[2][2] != 0:
        counter = counter + 1
    return counter
#dimension del espacio nulo
def nuldimention(matrix):
    counter = 3 - rangeA(matrix)
    return counter
#FIL(A)
def rowA(matrix):
    new_matrix = round_terms(escalonate_matrix(matrix))
    return new_matrix

def colA(matrix):
    matrix1 = copy.deepcopy(matrix)
    new_matrix = round_terms(escalonate_matrix(copy.deepcopy(matrix)))
    i = 0
    column_a = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    if new_matrix[0][0] != 0:
        for i in range (0,3):
            column_a[0][i] = matrix[i][0]
    if new_matrix[1][1] != 0:
        for i in range (0,3):
            column_a[1][i] = matrix[i][1]
    if new_matrix[2][2] != 0:
        for i in range (0,3):
            column_a[2][i] = matrix[i][2]
    print(column_a)
    return column_a

#+++++++++++++NUL(A)
def nulA(matrix):
    nula = []
    print(matrix)
    counter = 0
    for i in range(-10, 10):
        for j in range(-10, 10):
            for k in range(-10, 10):
                if i == 0 or k == 0 or j == 0:
                    pass
                else:
                    if (((matrix[0][0] * i) + (matrix[0][1] * j) + (matrix[0][2] * k)) == 0) and (((matrix[1][0] * i) + (matrix[1][1] * j) + (matrix[1][2] * k)) == 0) and (((matrix[2][0] * i) + (matrix[2][1] * j) + (matrix[2][2] * k)) == 0):
                        nula.append([i,j,k])
                        counter = counter + 1
    return nula                        
        
#++++++++++++++++++++++++PROOOOOOOOOFFFF
