#include "stdio.h"
#include "string.h"

void win() {
    FILE* f = fopen("/flag.txt", "r");
    char buf[128];
    memset(buf, 0, 128);
    fread(buf, 1, 128, f);

    puts(buf);
}

void printMenu() {
    puts("Welcome to our amazing product. You need to activate it with a licence.");
    puts("\t1. Input normal licence.");
    puts("\t2. Input premium licence.");
    printf("> ");
    fflush(stdout);
}

void handleNormalLicence() {
    printf("Input user licence: ");
    fflush(stdout);
    fflush(stdin);
    char buf[64];
    scanf("%128s", &buf);

    if (!strcmp(buf, "XFER{4ll_1_4sk_1s_4_l1c3nc3}")) {
        puts("Thank you for using our product in user mode. :)");
    } else {
        puts("Sorry, that isn't a correct licence.");
    }
}

// XFER{L1c3nc4_0d_m1l1un_d0l4r4}
int checkPremiumLicence(char* licence) {
    if (strlen(licence) != 30) {
        puts("Sorry, that isn't a correct licence");
        return 0;
    }

    if (strncmp(licence, "XFER{", 5) != 0) {
        puts("Sorry, that isn't a correct licence");
        return 0;
    }

    if (!(licence[5] == 'L' && licence[6] == '1' && licence[7] == 'c' && licence[8] == '3' && licence[9] == 'n' && licence[10] == 'c' && licence[11] == '4')) {
        puts("Sorry, that isn't a correct licence");
        return 0;
    }

    char *str = "_nu1l1m_d0_";
    for (int i = 10; i >= 0; i--) {
        if (licence[12 + i] != str[10 - i]) {
            puts("Sorry, that isn't a correct licence");
            printf("%d\n", i);
            return 0;
        }
    }

    char *str2 = "d0l4r4}";
    for (int i = 0; i < 7; i++) {
        if (licence[23 + i] != str2[i]) {
            puts("Sorry, that isn't a correct licence");
            return 0;
        }
    }

    return 1;
}

void handlePremiumLicence() {
    printf("Input premium licence: ");
    fflush(stdout);
    char buf[64];
    memset(buf, 0, 64);
    scanf("%63s", &buf);
    buf[strcspn(buf, "\n")] = 0;

    if (checkPremiumLicence(buf)) {
        puts("Welcome premium user!!! Glad to have you here.");
    }
}

int main() {
    setvbuf(stdout, NULL, _IONBF, 0);
    setvbuf(stdin, NULL, _IONBF, 0);
    setvbuf(stderr, NULL, _IONBF, 0);
    printMenu();
    int option = 0;
    scanf("%d", &option);
    switch (option) {
        case 1: {
            handleNormalLicence();
            break;
        }
        case 2: {
            handlePremiumLicence();
            break;
        }
        default: {
            puts("Invalid option");
        }
    }
}
