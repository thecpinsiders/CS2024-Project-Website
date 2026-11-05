@echo off
REM Downloads every stock photo into assets\img\photos so the site works offline and in any preview.
cd /d "%~dp0"
if not exist assets\img\photos mkdir assets\img\photos
echo tent_stars & curl -sL -o "assets\img\photos\tent_stars.jpg" "https://images.unsplash.com/photo-1641734015274-6a3bedd7b314?auto=format&fit=crop&w=1800&q=75&fm=jpg"
echo sea_sunset & curl -sL -o "assets\img\photos\sea_sunset.jpg" "https://images.unsplash.com/photo-1754147793280-1641d0bbf716?auto=format&fit=crop&w=1800&q=75&fm=jpg"
echo beach_tent & curl -sL -o "assets\img\photos\beach_tent.jpg" "https://images.unsplash.com/photo-1749047899565-6f026c3bb809?auto=format&fit=crop&w=1800&q=75&fm=jpg"
echo kids_tent & curl -sL -o "assets\img\photos\kids_tent.jpg" "https://images.unsplash.com/photo-1674230316788-d9c8b92f0d63?auto=format&fit=crop&w=1800&q=75&fm=jpg"
echo family_beach & curl -sL -o "assets\img\photos\family_beach.jpg" "https://images.unsplash.com/photo-1653185460299-fbef9466c1e7?auto=format&fit=crop&w=1800&q=75&fm=jpg"
echo tents_night & curl -sL -o "assets\img\photos\tents_night.jpg" "https://images.unsplash.com/photo-1587547131116-a0655a526190?auto=format&fit=crop&w=1800&q=75&fm=jpg"
echo bench_laptop & curl -sL -o "assets\img\photos\bench_laptop.jpg" "https://images.unsplash.com/photo-1698891667786-477953058f55?auto=format&fit=crop&w=1800&q=75&fm=jpg"
echo creator_tripod & curl -sL -o "assets\img\photos\creator_tripod.jpg" "https://images.unsplash.com/photo-1517701182107-df3d9eb865c5?auto=format&fit=crop&w=1800&q=75&fm=jpg"
echo creator_cam & curl -sL -o "assets\img\photos\creator_cam.jpg" "https://images.unsplash.com/photo-1525027147801-2ccc35db3c49?auto=format&fit=crop&w=1800&q=75&fm=jpg"
echo creator_edit & curl -sL -o "assets\img\photos\creator_edit.jpg" "https://images.unsplash.com/photo-1758613655335-63e9e75af77f?auto=format&fit=crop&w=1800&q=75&fm=jpg"
echo laptop_picnic & curl -sL -o "assets\img\photos\laptop_picnic.jpg" "https://images.unsplash.com/photo-1745239084528-0331e13eed34?auto=format&fit=crop&w=1800&q=75&fm=jpg"
echo router & curl -sL -o "assets\img\photos\router.jpg" "https://images.unsplash.com/photo-1606420187127-dae7c868fa7a?auto=format&fit=crop&w=1800&q=75&fm=jpg"
echo beach_day & curl -sL -o "assets\img\photos\beach_day.jpg" "https://images.unsplash.com/photo-1627820988643-8077d82eed7d?auto=format&fit=crop&w=1800&q=75&fm=jpg"
echo candle & curl -sL -o "assets\img\photos\candle.jpg" "https://images.unsplash.com/photo-1605585148189-e40fd347e329?auto=format&fit=crop&w=1800&q=75&fm=jpg"
echo lamp & curl -sL -o "assets\img\photos\lamp.jpg" "https://images.unsplash.com/photo-1749226949594-12164ae840dc?auto=format&fit=crop&w=1800&q=75&fm=jpg"
echo sg_night & curl -sL -o "assets\img\photos\sg_night.jpg" "https://images.unsplash.com/photo-1774075884764-be7319c06e08?auto=format&fit=crop&w=1800&q=75&fm=jpg"
echo camper & curl -sL -o "assets\img\photos\camper.jpg" "https://images.unsplash.com/photo-1675189693048-4bef1b0690db?auto=format&fit=crop&w=1800&q=75&fm=jpg"
echo Done. Photos saved in assets\img\photos.
pause
