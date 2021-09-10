package tools

import (
	"crypto/rand"
	"math/big"
)

func GenerateAddress(n int) string {
	var address string

	for i := 0; i < n; i++ {
		v, _ := rand.Int(rand.Reader, big.NewInt(2048))
		word := v.String()

		var prefix string
		for j := 0; j < n-len(word); j++ {
			prefix += "0"
		}
		address += prefix + word
	}
	return address
}
