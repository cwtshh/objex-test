class User:
    def __init__(self, name, age) -> None:
        self.name = name
        self.age = age

    def show_data(self):
        print(f"Name: {self.name}, Age: {self.age}")