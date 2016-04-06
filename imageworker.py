from PIL import Image

def process():
    image = Image.open("app/img/puzzle/4.jpg")

    print image.height
    print image.width

    x = 4
    y = 5

    width_parts = image.width / x
    height_parts = image.height / y

    num = 0

    for i in range(x):
        for j in range(y):
            p = image.crop((width_parts * i, height_parts * j, width_parts * (i + 1), height_parts * (j + 1)))
            print p
            #images.append(p)
            num = num + 1
            p.save("app/img/puzzle/p" + str(num) + ".jpeg", format='jpeg', quality=100)

if __name__ == '__main__':
    process()
