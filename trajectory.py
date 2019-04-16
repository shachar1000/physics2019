from pylab import *
import math
import numpy

θ=45 # 45 deg angle
v0=10 # intial velocity

x0=0
y0=0

t0=0
tf=8



dt=dt=0.0001


g=0.1 #m/s^2

R = 0.5
m=0.1

vx0=v0*math.cos(θ)
vy0=v0*math.sin(θ)

tArray = numpy.arange(t0, tf+dt, dt)

x = [x0]
y = [y0]

vx = [vx0] # רשימה הכוללת את המהירוית בציר האיקס
vy = [vy0] # רשימה הכוללת את המהירויות בציר הוואי

for i in range(1,len(tArray)):
    x.append(x[i-1] + vx[i-1] * dt) # נשנה את המיקום של הגוף בציר האיקס לפי המהירות הקודמת
    y.append(y[i-1] + vy[i-1] * dt) # אותו ד
    vx.append(vx[i-1] -    (R * (vx[i-1]**2))/m * dt  ) # נוסיף מהירות חדשה לרשימה המושפעת מהמהירות הקודמת כלומר האיבר הקודם ברשימה
    vy.append(vy[i-1] - (g * dt) - (   (R * (vy[i-1] ** 2)/m * dt  )    )) # אותו דבר רק בציר הוואי

    if y[i] < 0:
        print(x[i])
        break

plot(x, y)
show()
