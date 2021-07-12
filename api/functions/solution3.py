import numpy as np

#Para encontrar los valores propios de la matriz que se envio
def valores_propios(matrix):
    n = int(3)
    A = np.array(matrix).reshape(3,3)
    valor_propio = np.linalg.eigvals(A)
    list(valor_propio)
    arrayStrings = []
    for i in range(0, 3): 
        if "<class 'numpy.complex128'>" == str(type(valor_propio[i])):
            valor_propio[i] = str(round(valor_propio[i]))
            arrayStrings.append(str(round(valor_propio[i])))
        else:
            valor_propio[i] = round(valor_propio[i])
            arrayStrings.append(round(valor_propio[i]))

    return arrayStrings

#Resta la matriz con la matriz identidad del valor propio
def resta(U, num):
    identidad = num * np.identity(3)
    D = U - identidad
    return D

#Escalona la matriz para armar los vectores
def escalonada(A):
    B = np.array([[0],
              [0],
              [0]])

    casicero = 1e-15 # Considerar como 0

    # Evitar truncamiento en operaciones
    A = np.array(A,dtype=float) 

    # Matriz aumentada
    AB = np.concatenate((A,B),axis=1)
    AB0 = np.copy(AB)

    # Pivoteo parcial por filas
    tamano = np.shape(AB)
    n = tamano[0]
    m = tamano[1]

    # Para cada fila en AB
    for i in range(0,n-1,1):
     # columna desde diagonal i en adelante
        columna = abs(AB[i:,i])
        dondemax = np.argmax(columna)
    
        # dondemax no está en diagonal
        if (dondemax !=0):
        # intercambia filas
            temporal = np.copy(AB[i,:])
            AB[i,:] = AB[dondemax+i,:]
            AB[dondemax+i,:] = temporal
        
    AB1 = np.copy(AB)

    # eliminacion hacia adelante
    for i in range(0,n-1,1):
        pivote = AB[i,i]
        adelante = i + 1
        for k in range(adelante,n,1):
            factor = AB[k,i]/pivote
            AB[k,:] = AB[k,:] - AB[i,:]*factor
    AB2 = np.copy(AB)

    # elimina hacia atras
    ultfila = n-1
    ultcolumna = m-1
    for i in range(ultfila,0-1,-1):
        pivote = AB[i,i]
        atras = i-1 
        for k in range(atras,0-1,-1):
            factor = AB[k,i]/pivote
            AB[k,:] = AB[k,:] - AB[i,:]*factor
            # diagonal a unos
        AB[i,:] = AB[i,:]/AB[i,i]
    X = np.copy(AB[:,ultcolumna])
    X = np.transpose([X])

    U=np.zeros((3,3))
    U[0,:]=AB2[0,:3]
    U[1,:]=AB2[1,:3]
    U[2,:]=AB2[2,:3]
    return U

#Armar los vectores de los valores propios
def vectores(matrix):
    x = 0
    y = 0
    z = 0
    vectores = []
    for i in range (0,3):
        contador = 0
        for j in range (0,3):
            if(matrix[i][j] == 0):
                contador = contador+1
            if(j == 2):
                if(contador == 3):
                    print('variable libre')
                    if(i == 0):
                        x = 1
                    if(i == 1):
                        y = 1
                    if(i==2):
                        z = 1
                else:
                    print('ecuacion')
    if(x + y + z == 0 and matrix[2][0]== 0 and matrix[2][1] == 0 and matrix[2][2] != 0):
        z = 1                
    if(x == 1):
        vx = vector_x(matrix)
        vectores.append(list(vx))
    if(y == 1):
        vy = vector_y(matrix)
        vectores.append(list(vy))
    if(z == 1):
        vz = vector_z(matrix)
        vectores.append(list(vz))
    return vectores
    
#Armar vector dependiente para z
def vector_z(matrix):
    vector = np.zeros(3)
    # ecuación de la tercera línea
    vector[2] = 1
    #ecuacion de la segunda línea
    if(matrix[1][0] == 0):
        if(matrix[1][1] == 1):
            vector[1] = matrix[1][2]*-1
        else:
            if(matrix[1][1] == 0):
                vector[1] = 0
            else:
               vector[1] = (matrix[1][2]*-1)/ matrix[1][1]
    # ecuacion de la primera linea     
    if(matrix[0][1]==0):
        if(matrix[0][0]==1):
            vector[0]= matrix[0][2]*-1
        else:
            vector[0]= (matrix[0][2]*-1)/matrix[0][0]
    else:
        if(matrix[0][0]==1):
            vector[0]= (matrix[0][2]*-1)+(matrix[0][1]*vector[1]*-1)
        else:
            vector[0]= ((matrix[0][2]*-1)+(matrix[0][1]*vector[1]*-1))/matrix[0][0]

    return vector   

#Armar vector dependiente para y
def vector_y(matrix):
    vector = np.zeros(3)
    # ecuación de la segunda línea
    vector[1] = 1
    #ecuacion de la tercera línea
    if(matrix[2][0] == 0):
        if(matrix[2][1] == 1):
            vector[2] = matrix[2][2]*-1
        else:
            if(matrix[2][2] == 0):
                vector[2] = 0
            else:
               vector[2] = (matrix[2][2]*-1)/ matrix[2][1]
    # ecuacion de la primera linea     
    if(matrix[0][2]==0):
        if(matrix[0][0]==1):
            vector[0]= matrix[0][1]*-1
        else:
            vector[0]= (matrix[0][1]*-1)/matrix[0][0]
    else:
        if(matrix[0][0]==1):
            vector[0]= (matrix[0][1]*-1)+(matrix[0][2]*vector[2]*-1)
        else:
            vector[0]= ((matrix[0][1]*-1)+(matrix[0][2]*vector[2]*-1))/matrix[0][0]

    return vector

#Armar vector dependiente para x
def vector_x(matrix):
    vector = np.zeros(3)
    # ecuación de la primera linea
    vector[0] = 1  
    #ecuacion de la segunda línea
    if(matrix[1][2] == 0):
        if(matrix[1][1] == 1):
            vector[1] = matrix[1][0]*-1
        else:
            if(matrix[1][1] == 0):
                vector[1] = 0
            else:
               vector[1] = (matrix[1][0]*-1)/ matrix[1][1]
    # ecuacion de la tercera linea     
    if(matrix[2][1]==0):
        if(matrix[2][2]==1):
            vector[2]= matrix[2][0]*-1
        else:
            vector[2]= (matrix[2][0]*-1)/matrix[2][2]
    else:
        if(matrix[2][2]==1):
            vector[2]= (matrix[2][0]*-1)+(matrix[2][1]*vector[1]*-1)
        else:
            vector[2]= ((matrix[2][0]*-1)+(matrix[2][1]*vector[1]*-1))/matrix[2][2]

    return vector

def vectores_propios(matrix):
    #entrar
    n = int(3)
    vectores_propios_array = []
    # temp=[]
    # print("Introduzca la matriz de coeficientes: \ n")
    # for i in range(n):
    #     temp.append([float(i) for i in  input().split()])
    # print("Temp")
    # print(temp)
    A = np.array(matrix).reshape(n,n)
    # A = matrix
    # print('Matriz recibida: ')
    # print(A)
    valores = np.linalg.eigvals(A)
    print('Valores propios: ')
    print(valores)
    for elemento in valores:
        D = resta(A, elemento)
        print('matriz restada')
        
        print(D)
        R = escalonada(D)
        for i in range(0, 3): 
            for j in range(0, 3):
                R[i][j] = round(R[i][j], 3)
        print("matriz escalonada: ")
        print(R)
        
        vec = vectores(R)
        print(vec)
        vectores_propios_array.append(vec)
    print(vectores_propios_array)
    return vectores_propios_array
        
# if __name__=='__main__':
#     main()