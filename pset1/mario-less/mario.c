#include <cs50.h>
#include <stdio.h>

void printPyramideRight(int n);

int main(void) {
    int n;
    do {
        n = get_int("Height: ");
    } while(n < 1 || n > 8);

    printPyramideRight(n);
}

void printPyramideRight(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = n - i; j > 1; j--){
            printf(" ");
        }
        for (int j = 0; j <= i; j++){
            printf("#");
        }
        printf("\n");
    }
}