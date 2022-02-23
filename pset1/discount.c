#include <stdio.h>
#include <cs50.h>

float discount(float price, int percent_off);

int main(void) {
    float regular = get_float("Regular price: ");
    int percent_off = get_int("Percent Off: ");
    float sale = discount(regular, percent_off);
    printf("Sale Price: %.2f\n", sale);
}

float discount(float price, int percent_off) {
    return price * (100 - percent_off) / 100;
}