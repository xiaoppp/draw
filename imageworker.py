from PIL import Image

def process():
    image = Image.open("app/img/puzzle/3.jpg")

    print image.height
    print image.width

    x = 3
    y = 3

    width_parts = image.width / x
    height_parts = image.height / y

    num = 0

    for i in range(x):
        for j in range(y):
            p = image.crop((width_parts * i, height_parts * j, width_parts * (i + 1), height_parts * (j + 1)))
            print p
            #images.append(p)
            num = num + 1
            p.save("app/img/puzzle/p" + str(num) + ".jpg", format='jpeg', quality=100)

if __name__ == '__main__':
    process()
