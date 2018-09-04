import os
import shutil

destination_base = "./resources/img/portfolio/%s/%s/%s"

for current, folders, files in os.walk("./update"):
    for f in files:
        if not f.startswith("."):
            name = current.replace("./update/", "").replace("./update", "").replace("/thumb", "")
            if current.endswith("/thumbs"):
                print(os.path.join(current, f), destination_base % ("thumbs", name, f))
                os.makedirs(destination_base % ("thumbs", name, ""), exist_ok=True)
                shutil.copy2(os.path.join(current, f), destination_base % ("thumbs", name, f))
            else:
                print(os.path.join(current, f), destination_base % ("full", name, f))
                os.makedirs(destination_base % ("full", name, ""), exist_ok=True)
                shutil.copy2(os.path.join(current, f), destination_base % ("full", name, f))
