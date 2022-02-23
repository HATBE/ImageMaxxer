#include <cs50.h>
#include <stdio.h>

int main(void) {
    long x = get_int("x: ");
    long y = get_int("y: ");
    long z = x + y;
    printf("%li\n", z);
    if(x < y) {
        printf("y is bigger than x\n");
    } else if(x > y) {
        printf("x is bigger than y\n");
    } else {
        printf("x and y are equal\n");
    }
}