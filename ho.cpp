#include <iostream>
using namespace std;


int main() {
    int n;
    cout << "nhập vào n: ";
    cin >> n;
    int matrix[n][n];
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < n; j++) {
            cout << "matrix[" << i << "][" << j << "] = ";
            cin >> matrix[i][j];
        }
    }
    int dem = 0;
    for(int i = 0; i < n; i++) {
            if(matrix[i][i] %2 != 0) {
                dem++;
            }
    }
    cout << "so luong so le tren duong cheo chinh la" << dem << endl;
}