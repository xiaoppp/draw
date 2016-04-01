from PIL import Image

def process():
    image = Image.open("app/img/3.jpg")

    print image.height
    print image.width

    x = 3
    y = 3

    width_parts = image.width / x
    height_parts = image.height / y

    for i in range(x):
        for j in range(y):
            p = image.crop((width_parts * i, height_parts * j, width_parts * (i + 1), height_parts * (j + 1)))
            print p
            #images.append(p)
            p.save("app/img/new" + str(i) + str(j) + ".jpeg", format='jpeg', quality=100)

if __name__ == '__main__':
    process()
