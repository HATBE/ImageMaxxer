#include <cs50.h>
#include <stdio.h>

void printPyramide(int n);

int main(void) {
    int n;
    do {
        n = get_int("Height: ");
    } while(n < 1 || n > 8);

    printPyramide(n);
}

void printPyramide(int n) {
    for (int i = 0; i < n; i++) {
        for (int j = n - i; j > 1; j--){
            printf(".");
        }
        for (int j = 0; j <= i; j++){
            printf("#");
        }
        printf("..");
        for (int j = 0; j < n; j++) {
             if(i > j - 1) {
                 printf("#");
             } else {
                 printf(".");
             }
         }

        printf("\n");
    }
}